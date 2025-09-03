import { DialogsEnum } from './enums';
import { SetHideDialogsCommandArguments } from './types';

export const dialogs = {
  /**
   * Sets whether to hide  dialogs or not (Both audio and video preview dialogs).
   *
   * @param setHideDialogsCommandArguments whether to hide  dialogs or not.
   * Refer to {@link SetHideDialogsCommandArguments} to understand the argument structure.
   */
  setHideDialogs: (
    setHideDialogsCommandArguments: SetHideDialogsCommandArguments,
  ) => {
    const { hidden } = setHideDialogsCommandArguments;
    window.dispatchEvent(
      new CustomEvent<
        SetHideDialogsCommandArguments
      >(DialogsEnum.SET_HIDE_DIALOGS, {
        detail: {
          hidden,
        },
      }),
    );
  },
};
