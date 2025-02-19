export interface SetSelfViewDisableAllDevicesCommandArguments {
  isSelfViewDisabledAllDevices: boolean;
}

export interface SetSelfViewDisableCommandArguments {
  isSelfViewDisabled: boolean;
  streamId: string;
}

export interface UiCommandsCameraObject {
  setSelfViewDisableAllDevices: (
    setSelfViewDisableAllDevicesCommandArguments: SetSelfViewDisableAllDevicesCommandArguments
  ) => void;
  setSelfViewDisable: (
    setSelfViewDisableAllDevicesCommandArguments: SetSelfViewDisableCommandArguments
  ) => void;
}
