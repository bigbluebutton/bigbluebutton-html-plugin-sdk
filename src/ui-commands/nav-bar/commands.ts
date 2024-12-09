import { NavBarEnum } from './enums';
import { SetDisplayNavBarCommandArguments } from './types';

export const navBar = {
  /**
   * Sets the displayNavBar to true (show it) or false (hide it).
   *
   * @param setDisplayNavBarCommandArguments: object with a boolean that tells whether to display
   * the navbar
   */
  setDisplayNavBar: (setDisplayNavBarCommandArguments: SetDisplayNavBarCommandArguments) => {
    const { displayNavBar } = setDisplayNavBarCommandArguments;
    window.dispatchEvent(
      new CustomEvent<
        SetDisplayNavBarCommandArguments
      >(NavBarEnum.SET_DISPLAY_NAV_BAR, {
        detail: {
          displayNavBar,
        },
      }),
    );
  },
};
