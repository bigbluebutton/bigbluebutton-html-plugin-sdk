export interface SetHideMediaDialogsCommandArguments {
  hidden: boolean;
}

export interface UiCommandsDialogsObject {
  setHideMediaDialogs: (
    setHideMediaDialogsCommandArguments: SetHideMediaDialogsCommandArguments
  ) => void;
}
