import { UserStatusEnum } from './enums';
import { SetAwayStatusCommandArguments } from './types';

export const userStatus = {
  /**
   * Sets the away status of the user to a certain status.
   *
   * @param setAwayStatusCommandArguments the status to which the core will set the user
   * status.
   * Refer to {@link SetAwayStatusCommandArguments} to understand the argument structure.
   */
  setAwayStatus: (setAwayStatusCommandArguments: SetAwayStatusCommandArguments) => {
    const { away } = setAwayStatusCommandArguments;
    window.dispatchEvent(
      new CustomEvent<
        SetAwayStatusCommandArguments
      >(UserStatusEnum.SET_AWAY_STATUS, {
        detail: {
          away,
        },
      }),
    );
  },
};
