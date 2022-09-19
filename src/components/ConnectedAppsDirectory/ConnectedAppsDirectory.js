import { Tab, Actions } from "@twilio/flex-ui";
import { Box, Flex, Spinner } from "@twilio-paste/core";
import ConnectedAppSearch from "../Utility/Search";
import ConnectedAppTransferComponent from "../ConectedAppTransferComponent/ConnectedAppTransferComponent";
import { fetchConnectedApps } from "../../helpers/fetchConnectedApps";
import { transferToConnectedApp } from "../../helpers/transferToConnectedApp";
import { useState, useEffect } from "react";

const ConnectedAppsDirectoryContainer = (props) => {
  const { theme, task } = props;
  const [connectedApps, updateConnectedApps] = useState({
    loading: true,
    data: [],
  });
  const [searchString, searchUpdated] = useState("");

  useEffect(() => {
    const initConnectedApps = async () => {
      const connectedApps = await fetchConnectedApps();

      updateConnectedApps({ loading: false, data: connectedApps });
    };

    initConnectedApps();
  }, []);

  const onSearchUpdated = (searchString) => {
    searchUpdated(searchString);
  };

  const onColdTransferClicked = (connectedApp) => {
    transferToConnectedApp(task, connectedApp);
    Actions.invokeAction("HideDirectory");
  };

  const filteredConnectedApps = connectedApps.data.filter((connectedApp) =>
    connectedApp.getName.toLowerCase().includes(searchString.toLowerCase())
  );

  const connectedAppItemsToDisplay = filteredConnectedApps.map(
    (connectedApp) => (
      <ConnectedAppTransferComponent
        connectedApp={connectedApp}
        onColdTransferClicked={onColdTransferClicked}
      />
    )
  );

  return (
    <Tab>
      <Flex vertical width="100%">
        <Box width="100%">
          <Box
            padding={`${theme.tokens.spacings.space50}`}
            paddingTop={`${theme.tokens.spacings.space60}`}
          >
            <ConnectedAppSearch
              placeholder="Search"
              onChange={onSearchUpdated}
            />
          </Box>
          <Box
            paddingLeft={`${theme.tokens.spacings.space30}`}
            paddingRight={`${theme.tokens.spacings.space30}`}
          >
            {connectedApps.loading && (
              <Spinner
                decorative={false}
                title="Loading applications"
                size="sizeIcon80"
              />
            )}
            {connectedAppItemsToDisplay}
          </Box>
        </Box>
      </Flex>
    </Tab>
  );
};

export { ConnectedAppsDirectoryContainer as default };
