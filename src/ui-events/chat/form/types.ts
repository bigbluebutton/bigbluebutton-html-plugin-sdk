import { ChatFormEventsNames } from './enums';

export type ChatFormEventPayloads = {
  [ChatFormEventsNames.CHAT_INPUT_TEXT_CHANGED]: {
    text: string;
  },
  [ChatFormEventsNames.CHAT_INPUT_FOCUSED]: void,
  [ChatFormEventsNames.CHAT_INPUT_UNFOCUSED]: void,
};
