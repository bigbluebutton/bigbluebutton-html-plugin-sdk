export interface SetAwayStatusCommandArguments {
  away: boolean;
}

export interface UiCommandsUserStatusObject {
  setAwayStatus: (setAwayStatusCommandArguments: SetAwayStatusCommandArguments) => void;
}
