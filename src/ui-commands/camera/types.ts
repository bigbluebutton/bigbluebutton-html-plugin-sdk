export interface SetSelfViewDisableAllDevicesCommandArguments {
  isSelfViewDisabledAllDevices: boolean;
}

export interface SetSelfViewDisableCommandArguments {
  isSelfViewDisabled: boolean;
  streamId: string;
}

interface ByUserId {
  userId: string;
}

interface ByStreamId {
  streamId: string;
}

export type ObjectTo = ByUserId | ByStreamId;

export interface SetCameraFocusCommandArguments {
  focus: boolean;
  webcamSelector: ObjectTo[];
}

export interface UiCommandsCameraObject {
  setSelfViewDisableAllDevices: (
    setSelfViewDisableAllDevicesCommandArguments: SetSelfViewDisableAllDevicesCommandArguments
  ) => void;
  setSelfViewDisable: (
    setSelfViewDisableAllDevicesCommandArguments: SetSelfViewDisableCommandArguments
  ) => void;
  setCameraFocus: (
    setCameraFocusCommandArguments: SetCameraFocusCommandArguments
  ) => void;
}
