import { ChatFormCommandsEnum } from './enums';
import { FillChatFormCommandArguments } from './types';

export const form = {
  /**
   * Opens the public chat panel automatically.
   */
  open: () => {
    window.dispatchEvent(new Event(ChatFormCommandsEnum.OPEN));
  },

  /**
   * Fills in the chat input when called.
   *
   * @param FillChatFormCommandArguments the text with which the method will fill the chat input.
   * Refer to {@link FillChatFormCommandArguments} to understand the argument structure.
   */
  fill: (fillChatFormCommandArguments: FillChatFormCommandArguments) => {
    window.dispatchEvent(
      new CustomEvent<
        FillChatFormCommandArguments
      >(ChatFormCommandsEnum.FILL, {
        detail: fillChatFormCommandArguments,
      }),
    );
  },
};
