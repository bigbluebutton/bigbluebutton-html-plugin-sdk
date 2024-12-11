import { CameraEnum } from './enums';
import { SetSelfViewDisableAllDevicesCommandArguments } from './types';

export const camera = {
  /**
   * Sets the displayNavBar to true (show it) or false (hide it).
   *
   * @param setSelfViewDisableAllDevicesCommandArguments: object with a
   * boolean that tells whether to display the navbar
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
};
