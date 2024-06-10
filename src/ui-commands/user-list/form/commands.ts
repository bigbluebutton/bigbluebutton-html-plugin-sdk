import { UserListFormCommandsEnum } from './enums';

export const form = {
  /**
   * Opens the user list panel automatically.
   */
  open: () => {
    window.dispatchEvent(new Event(UserListFormCommandsEnum.OPEN));
  },

  /**
   * Closes the user list panel (and sidebard content panel) automatically.
   */
  close: () => {
    window.dispatchEvent(new Event(UserListFormCommandsEnum.CLOSE));
  },
};
