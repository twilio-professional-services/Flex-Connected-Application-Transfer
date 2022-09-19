import { Icon, IconButton } from "@twilio/flex-ui";
import {
  ItemInnerContainer,
  AppAvatar,
  AppTitleContainer,
  ButtonContainer,
} from "./ConnectedAppTransferComponent.Components";

const ConnectedAppTransferComponent = (props) => {
  const { connectedApp, onColdTransferClicked } = props;

  return (
    <ItemInnerContainer className="Twilio-WorkerDirectory-App" noGrow noShrink>
      <AppAvatar noGrow noShrink className="Twilio-WorkerDirectory-AppAvatar">
        <Icon icon="Queues" />
      </AppAvatar>
      <AppTitleContainer className="Twilio-WorkerDirectory-AppContent">
        {connectedApp.getName}
      </AppTitleContainer>
      <ButtonContainer className="Twilio-WorkerDirectory-ButtonContainer">
        <IconButton
          icon="Transfer"
          onClick={() => onColdTransferClicked(connectedApp)}
          title={connectedApp.getName}
          size="small"
          variant="secondary"
        />
      </ButtonContainer>
    </ItemInnerContainer>
  );
};

export default ConnectedAppTransferComponent;
