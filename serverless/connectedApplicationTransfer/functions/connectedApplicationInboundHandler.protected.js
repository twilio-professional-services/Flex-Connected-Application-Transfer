function getConnectedApplicationMappings() {
  const path = Runtime.getAssets()["/connectedApplicationConfig.js"].path;
  const connectedApplicationMappings = require(path);

  return connectedApplicationMappings.config;
}

function getSidToHandleCall(applicationSid, transferType, transferTarget) {
  const connectedApplicationMappings = getConnectedApplicationMappings();
  const applicationMappings = connectedApplicationMappings[applicationSid];
  let sid = undefined;

  if (applicationMappings) {
    sid = applicationMappings[transferType]?.[transferTarget];
  }

  if (sid) {
    return sid;
  } else {
    console.error(
      `No mapping configured for ${applicationSid} ${transferType} ${transferTarget}`
    );
    return undefined;
  }
}

function enqueueCall(sid, callerIdOverride, originalCallTaskAttributes) {
  const twiml = new Twilio.twiml.VoiceResponse();

  // For testing and POC purposes we will assume that you want to copy over a customerId from the original calls task attributes to the new task
  const originalCallTaskAttributesJson = JSON.parse(originalCallTaskAttributes);
  const { customerId = "" } = originalCallTaskAttributesJson;

  // Note we provide overRideAgentLegCallerId so that the Flex UI plugin knows what to set the callerrId to for the call leg from the conference to the agent.
  // If we dont override this it would attempt to set it to the applicationId which would cause the call setup to fail and reservation not to be accepted

  // TODO - bug in VO means task attributes are not getting updated (CCTRL-557)
  const json = {
    customerId: customerId,
  };

  twiml
    .enqueue({
      workflowSid: sid,
    })
    .task({}, JSON.stringify(json));

  return twiml;
}

function redirectToStudio(accountSid, flowSid) {
  const redirectURl = `https://webhooks.twilio.com/v1/Accounts/${accountSid}/Flows/${flowSid}`;

  let response = new Twilio.Response();
  response.setStatusCode(302);
  response.setHeaders({
    Location: redirectURl,
  });
  return response;
}

exports.handler = function (context, event, callback) {
  const emptyTwiml = new Twilio.twiml.VoiceResponse();

  const {
    CustomerId = undefined,
    ApplicationSid = undefined,
    Param_transferTargetType = undefined,
    Param_transferTarget = undefined,
    Param_taskAttributes = undefined,
  } = event;

  // Optionally check the 'CustomerId' is an account sid for a Flex Project that you expect to handle calls from otherwise anyone with the AP sid can send you calls

  if (
    !ApplicationSid ||
    !Param_transferTargetType ||
    !Param_transferTarget ||
    !Param_taskAttributes
  ) {
    console.error("Missing required parameters in incoming webhook");
    return callback(null, emptyTwiml);
  }

  // We have an incoming call with an application sid and required parameters.
  // Either enqueue the call if transferTargetType is a WorkFlow, or redirect the call to a studio flow if StudioFlow.

  const sid = getSidToHandleCall(
    ApplicationSid,
    Param_transferTargetType,
    Param_transferTarget
  );

  if (!sid) return callback(null, emptyTwiml);

  switch (Param_transferTargetType) {
    case "WorkFlow":
      callback(
        null,
        enqueueCall(sid, context.DEFAULT_CALLER_ID, Param_taskAttributes)
      );
      break;
    case "StudioFlow":
      callback(null, redirectToStudio(context.ACCOUNT_SID, sid));
      break;
    default:
      return callback(null, emptyTwiml);
  }
};
