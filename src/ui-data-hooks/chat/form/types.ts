import { ChatFormUiDataNames } from './enums';

export type ChatFormUiDataPayloads = {
  [ChatFormUiDataNames.CURRENT_CHAT_INPUT_TEXT]: {
    text: string;
  },
  [ChatFormUiDataNames.CHAT_INPUT_IS_FOCUSED]: {
    value: boolean
  },
};
