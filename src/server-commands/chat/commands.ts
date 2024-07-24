import { PUBLIC_CHAT_ID } from './constants';
import { ChatCommandsEnum } from './enum';
import {
  ChatSendPublicChatMessageCommandArguments,
  ChatSendPublicChatMessageEventArguments,
} from './types';

export const chat = (pluginName: string) => ({
  /**
   * Sends chat message to the public chat.
   *
   * @param chatSendPublicChatMessageCommandArguments the text and custom metadata(optional)
   *  to be sent in the public chat message.
   * Refer to {@link ChatSendPublicChatMessageCommandArguments} to understand the argument
   *  structure.
   */
  sendPublicChatMessage: (
    chatSendPublicChatMessageCommandArguments: ChatSendPublicChatMessageCommandArguments,
  ) => {
    window.dispatchEvent(
      new CustomEvent<
        ChatSendPublicChatMessageEventArguments
      >(ChatCommandsEnum.SEND_MESSAGE, {
        detail: {
          chatId: PUBLIC_CHAT_ID,
          pluginName,
          ...chatSendPublicChatMessageCommandArguments,
        },
      }),
    );
  },
});
