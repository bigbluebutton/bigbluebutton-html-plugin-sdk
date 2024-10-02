import { ConferenceEnum } from './enums';
import { SetSpeakerLevelCommandArguments } from './types';

export const conference = {
  /**
   * Sets the volume of the speakers in the conference to a certain level.
   * Needs to be a value between 0 and 1.
   *
   * @param setSpeakerLevelCommandArgumentsthe volume to which the core will set the speaker
   * level.
   * Refer to {@link SetSpeakerLevelCommandArguments} to understand the argument structure.
   */
  setSpeakerLevel: (setSpeakerLevelCommandArguments: SetSpeakerLevelCommandArguments) => {
    const { level } = setSpeakerLevelCommandArguments;
    if (level <= 1 && level >= 0) {
      window.dispatchEvent(
        new CustomEvent<
          SetSpeakerLevelCommandArguments
        >(ConferenceEnum.SET_SPEAKER_LEVEL, {
          detail: {
            level,
          },
        }),
      );
    } else {
      throw new Error('Not possible to set the speaker volume less than zero or higher than one');
    }
  },
};
