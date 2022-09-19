import { FlexBox, styled } from "@twilio/flex-ui";

export const ItemInnerContainer = styled(FlexBox)`
  align-items: center;

  color: inherit;
  outline: none;
  background: none;
  ${(props) => props.theme.WorkerDirectory.Item}
  &:hover, &:focus-within {
    & .Twilio-WorkerDirectory-ButtonContainer {
      opacity: 1;
      display: flex;
      & * {
        max-width: inherit;
        max-height: inherit;
      }
    }
  }
`;

export const ButtonContainer = styled("div")`
  opacity: 0;
  display: flex;
  & * {
    max-width: 1px;
    max-height: 1px;
  }
`;

export const AppTitleContainer = styled("div")`
  flex: 1 1 auto;
  overflow: hidden;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: ${(props) => props.theme.tokens.spacings.space40};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${(props) => props.theme.tokens.fontSizes.fontSize30};
  font-weight: ${(props) => props.theme.tokens.fontWeights.fontWeightBold};
  line-height: ${(props) => props.theme.tokens.lineHeights.lineHeight20};
`;

export const AppAvatar = styled(FlexBox)`
  width: ${(props) => props.theme.tokens.sizings.sizeSquare100};
  height: ${(props) => props.theme.tokens.sizings.sizeSquare100};
  margin: ${(props) => props.theme.tokens.spacings.space30};
  margin-right: 0;
  border-radius: 50%;
  overflow: hidden;
  justify-content: center;

  ${(props) => props.theme.WorkerDirectory.QueueItem.Avatar};
`;
