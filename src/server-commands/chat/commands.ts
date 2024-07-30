import { PUBLIC_CHAT_ID } from './constants';
import { ChatCommandsEnum } from './enum';
import {
  ChatSendMessageCommandArguments,
  ChatSendMessageEventArguments,
} from './types';

export const chat = (pluginName: string) => ({
  /**
   * Sends chat message to the public chat.
   *
   * @param chatSendMessageCommandArguments the text and custom metadata(optional)
   *  to be sent in the public chat message.
   * Refer to {@link ChatSendMessageCommandArguments} to understand the argument
   *  structure.
   */
  sendPublicChatMessage: (
    chatSendPublicChatMessageCommandArguments: ChatSendMessageCommandArguments,
  ) => {
    window.dispatchEvent(
      new CustomEvent<
        ChatSendMessageEventArguments
      >(ChatCommandsEnum.SEND_MESSAGE, {
        detail: {
          chatId: PUBLIC_CHAT_ID,
          pluginName,
          custom: false,
          ...chatSendPublicChatMessageCommandArguments,
        },
      }),
    );
  },

  /**
   * Sends custom chat message to the public chat. Custom messages are not rendered by
   * the BBB client and are meant to be custm-rendered by plugins.
   *
   * @param chatSendMessageCommandArguments the text and custom metadata(optional)
   *  to be sent in the public chat message.
   * Refer to {@link ChatSendMessageCommandArguments} to understand the argument
   *  structure.
   */
  sendCustomPublicChatMessage: (
    chatSendCustomPublicChatMessageCommandArguments: ChatSendMessageCommandArguments,
  ) => {
    window.dispatchEvent(
      new CustomEvent<
        ChatSendMessageEventArguments
      >(ChatCommandsEnum.SEND_MESSAGE, {
        detail: {
          chatId: PUBLIC_CHAT_ID,
          pluginName,
          custom: true,
          ...chatSendCustomPublicChatMessageCommandArguments,
        },
      }),
    );
  },
});
