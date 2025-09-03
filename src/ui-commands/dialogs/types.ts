export interface SetHideDialogsCommandArguments {
  hidden: boolean;
}

export interface UiCommandsDialogsObject {
  setHideDialogs: (
    setHideDialogsCommandArguments: SetHideDialogsCommandArguments
  ) => void;
}
