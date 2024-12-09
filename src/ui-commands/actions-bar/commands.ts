import { ActionsBarEnum } from './enums';
import { SetDisplayActionBarCommandArguments } from './types';

export const actionsBar = {
  /**
   * Decides whether to display the actions bar
   *
   * @param setSpeakerLevelCommandArgumentsthe volume to which the core will set the speaker
   * level.
   * Refer to {@link SetDisplayActionBarCommandArguments} to understand the argument structure.
   */
  setDisplayActionBar: (arg: SetDisplayActionBarCommandArguments) => {
    const { displayActionBar } = arg;
    window.dispatchEvent(new CustomEvent<
      SetDisplayActionBarCommandArguments
    >(ActionsBarEnum.SET_DISPLAY_ACTIONS_BAR, {
      detail: {
        displayActionBar,
      },
    }));
  },
};
