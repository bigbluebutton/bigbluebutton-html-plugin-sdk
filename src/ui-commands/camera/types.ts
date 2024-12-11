export interface SetSelfViewDisableAllDevicesCommandArguments {
  isSelfViewDisabledAllDevices: boolean;
}

export interface UiCommandsCameraObject {
  setSelfViewDisableAllDevices: (
    setSelfViewDisableAllDevicesCommandArguments: SetSelfViewDisableAllDevicesCommandArguments
  ) => void;
}
