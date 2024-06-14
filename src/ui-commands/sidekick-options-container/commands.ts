import { SidekickOptionsContainerEnum } from './enums';

export const sidekickOptionsContainer = {
  /**
   * Opens the sidekick container automatically.
   */
  open: () => {
    window.dispatchEvent(new Event(SidekickOptionsContainerEnum.OPEN));
  },

  /**
   * Closes the sidekick container (and sidebard content panel) automatically.
   */
  close: () => {
    window.dispatchEvent(new Event(SidekickOptionsContainerEnum.CLOSE));
  },
};
