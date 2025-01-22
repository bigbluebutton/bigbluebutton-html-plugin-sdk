export interface SetDisplayNavBarCommandArguments {
  displayNavBar: boolean;
}

export interface UiCommandsNavBarObject {
  setDisplayNavBar: (setDisplayNavBarCommandArguments: SetDisplayNavBarCommandArguments) => void;
}
