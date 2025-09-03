import { DialogsEnum } from './enums';
import { SetHideMediaDialogsCommandArguments } from './types';

export const dialogs = {
  /**
   * Sets whether to hide media dialogs or not (Both audio and video preview dialogs).
   *
   * @param setHideMediaDialogsCommandArguments whether to hide media dialogs or not.
   * Refer to {@link SetHideMediaDialogsCommandArguments} to understand the argument structure.
   */
  setHideMediaDialogs: (
    setHideMediaDialogsCommandArguments: SetHideMediaDialogsCommandArguments,
  ) => {
    const { hidden } = setHideMediaDialogsCommandArguments;
    window.dispatchEvent(
      new CustomEvent<
        SetHideMediaDialogsCommandArguments
      >(DialogsEnum.SET_HIDE_MEDIA_DIALOGS, {
        detail: {
          hidden,
        },
      }),
    );
  },
};
