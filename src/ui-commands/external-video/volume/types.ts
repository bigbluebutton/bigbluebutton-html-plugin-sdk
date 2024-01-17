export interface SetExternalVideoVolumeCommandArguments {
  volume: number;
}

export interface UiCommandsExternalVideoVolumeObject {
  set: (SetExternalVideoVolumeCommandArguments: SetExternalVideoVolumeCommandArguments) => void;
}
