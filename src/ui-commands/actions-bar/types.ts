export interface SetDisplayActionBarCommandArguments {
  displayActionBar: boolean;
}

export interface UiCommandsActionsBarObject {
  setDisplayActionBar: (
    arg: SetDisplayActionBarCommandArguments
  ) => void;
}
