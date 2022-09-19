import { Manager } from "@twilio/flex-ui";

export const transferToConnectedApp = (task, connectedApp) => {
  const customerCallSid = task?.attributes?.conference?.participants?.customer;

  if (!task || !connectedApp) return;

  const token =
    Manager.getInstance().store.getState().flex.session.ssoTokenPayload.token;

  const body = {
    TaskAttributes: JSON.stringify(task.attributes),
    Token: token,
    ApplicationSid: connectedApp.getApplicationSid,
    TransferTargetType: connectedApp.getTransferTargetType,
    TransferTarget: connectedApp.getTransferTarget,
    CallSid: customerCallSid,
  };

  const options = {
    method: "POST",
    body: new URLSearchParams(body),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  };

  fetch(
    `${process.env.FLEX_APP_SERVERLESS_FUNCTONS_DOMAIN}/dialToConnectedApplication`,
    options
  )
    .then((resp) => resp.json())
    .then((data) =>
      console.log(`dialToConnectedApplication response ${JSON.stringify(data)}`)
    )
    .catch((error) => console.error(error));
};
