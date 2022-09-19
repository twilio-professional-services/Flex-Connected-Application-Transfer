import ConnectedApp from "../classes/ConnectedApp";

const salesConnectedApp = new ConnectedApp(
  "Acme Contact Center - Sales",
  "APxxx",
  "StudioFlow",
  "SalesFlow"
);
const supportConnectedApp = new ConnectedApp(
  "Acme Contact Center - Support",
  "APxxx",
  "StudioFlow",
  "SupportFlow"
);

const backofficeConnectedApp = new ConnectedApp(
  "Backoffice team",
  "APxxx",
  "WorkFlow",
  "BackofficeWorkFlow"
);

const bpoConnectedApp = new ConnectedApp(
  "BPO team",
  "APxxx",
  "WorkFlow",
  "BackofficeWorkFlow"
);
const TestConnectedApps = [
  salesConnectedApp,
  supportConnectedApp,
  backofficeConnectedApp,
  bpoConnectedApp,
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const fetchConnectedApps = async () => {
  // in a real world example this would likely make a request to a backend service to get a list of transfers available
  return sleep(1000).then(() => TestConnectedApps);
};
