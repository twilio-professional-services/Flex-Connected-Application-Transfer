import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";
import { WorkerDirectory, Actions } from "@twilio/flex-ui";
import ConnectedAppsDirectoryTab from "./components/ConnectedAppsDirectory/ConnectedAppsDirectory";
import { CustomizationProvider } from "@twilio-paste/core/customization";

import { injectGlobal } from "react-emotion";
//If you have multiple transfer directory tabs increasing the width may help show the tab title labels
injectGlobal`
   .Twilio-WorkerDirectory-Popup{
       width: 350px
   }

`;

const PLUGIN_NAME = "ConnectedApplicationTransferPlugin";

export default class ConnectedApplicationTransferPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    flex.setProviders({
      PasteThemeProvider: CustomizationProvider,
    });

    WorkerDirectory.Tabs.Content.add(
      <ConnectedAppsDirectoryTab key="connected-app-tab" label="External" />
    );

    // TODO - IS THIS NEEDED? Test across accounts with connected application enabled
    // This workaround should be added to the plugin for Flex UI that accepts the connected application call.
    Actions.addListener("beforeAcceptTask", (payload) => {
      if (payload.task.attributes.overRideAgentLegCallerId) {
        payload.conferenceOptions.from =
          payload.task.attributes.overRideAgentLegCallerId;
      }
    });
  }
}
