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

export type WebcamSelector = ByUserId | ByStreamId;

export interface SetCameraFocusCommandArguments {
  focus: boolean;
  webcamSelector: WebcamSelector[];
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
