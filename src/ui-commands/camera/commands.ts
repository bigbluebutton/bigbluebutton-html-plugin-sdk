import { CameraEnum } from './enums';
import { SetSelfViewDisableAllDevicesCommandArguments, SetSelfViewDisableCommandArguments } from './types';

export const camera = {
  /**
   * Sets the self-view camera disabled/enabled for all cameras.
   *
   * @param setSelfViewDisableAllDevicesCommandArguments: object with a
   * boolean that tells whether to enable or not the self-view camera for all devices
   */
  setSelfViewDisableAllDevices: (
    setSelfViewDisableAllDevicesCommandArguments: SetSelfViewDisableAllDevicesCommandArguments,
  ) => {
    const {
      isSelfViewDisabledAllDevices,
    } = setSelfViewDisableAllDevicesCommandArguments;
    window.dispatchEvent(
      new CustomEvent<
        SetSelfViewDisableAllDevicesCommandArguments
      >(CameraEnum.SET_SELF_VIEW_DISABLED_ALL_DEVICES, {
        detail: {
          isSelfViewDisabledAllDevices,
        },
      }),
    );
  },

  /**
   * Sets the self-view camera disabled/enabled for specific camera.
   *
   * @param setSelfViewDisableCommandArguments: object with a
   * boolean that tells whether to enable or not the self-view camera for specific device
   */
  setSelfViewDisable: (
    setSelfViewDisableCommandArguments: SetSelfViewDisableCommandArguments,
  ) => {
    const {
      isSelfViewDisabled,
      streamId,
    } = setSelfViewDisableCommandArguments;
    window.dispatchEvent(
      new CustomEvent<
        SetSelfViewDisableCommandArguments
      >(CameraEnum.SET_SELF_VIEW_DISABLED, {
        detail: {
          isSelfViewDisabled,
          streamId,
        },
      }),
    );
  },
};
