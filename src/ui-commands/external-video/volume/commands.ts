import { ExternalVideoVolumeCommandsEnum } from './enums';
import { SetExternalVideoVolumeCommandArguments } from './types';

export const volume = {
  /**
   * Sets the volume of the external video to a certain level. Needs to be a value between 0 and 1.
   *
   * @param setExternalVideoVolumeCommandArguments the volume to which the core will set in the
   * external video.
   * Refer to {@link SetExternalVideoVolumeCommandArguments} to understand the argument structure.
   */
  set: (setExternalVideoVolumeCommandArguments: SetExternalVideoVolumeCommandArguments) => {
    const volumeToBeSet = setExternalVideoVolumeCommandArguments.volume;
    if (volumeToBeSet <= 1 && volumeToBeSet >= 0) {
      window.dispatchEvent(
        new CustomEvent<
          SetExternalVideoVolumeCommandArguments
        >(ExternalVideoVolumeCommandsEnum.SET, {
          detail: setExternalVideoVolumeCommandArguments,
        }),
      );
    } else {
      throw new Error('Not possible to set a volume less than zero or higher than one');
    }
  },
};
