const TokenValidator = require("twilio-flex-token-validator").functionValidator;

exports.handler = TokenValidator(async function (context, event, callback) {
  const client = context.getTwilioClient();
  const response = new Twilio.Response();

  try {
    const {
      ApplicationSid,
      TransferTargetType,
      TransferTarget,
      TaskAttributes,
      CallSid,
    } = event;
    if (
      !ApplicationSid ||
      !TransferTargetType ||
      !TransferTarget ||
      !TaskAttributes ||
      !CallSid
    )
      throw "Missing required request parameter";

    // Set the CORS headers to allow Flex to make an HTTP request to the Twilio Function
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST GET");
    response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
    response.appendHeader("Content-Type", "application/json");

    const twimDial =
      `<Response>` +
      `<Dial>` +
      `<Application copyParentTo='true'>` + // if the application sid is the 'To' this would cause issues accepting the reservation if enqueue used
      `${ApplicationSid}` +
      `<Parameter name="transferTargetType" value='${TransferTargetType}'/>` +
      `<Parameter name="transferTarget" value='${TransferTarget}'/>` +
      `<Parameter name="taskAttributes" value='${TaskAttributes}'/>` +
      `</Application>` +
      `</Dial>` +
      `</Response>`;

    const call = await client.calls(CallSid).update({ twiml: twimDial });

    response.setBody({ result: true, dialCallSid: call.sid });
    callback(null, response);
  } catch (err) {
    response.appendHeader("Content-Type", "plain/text");
    response.setBody(err);
    response.setStatusCode(500);

    callback(null, response);
  }
});
