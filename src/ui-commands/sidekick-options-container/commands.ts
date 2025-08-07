import { SidekickOptionsContainerEnum } from './enums';

export const sidekickOptionsContainer = {
  /**
   * Opens the sidekick container automatically.
   *
   * @deprecated Use the new {@link sidekickArea} object instead.
   */
  open: () => {
    window.dispatchEvent(new Event(SidekickOptionsContainerEnum.OPEN));
  },

  /**
   * Closes the sidekick container (and sidebard content panel) automatically.
   *
   * @deprecated Use the new {@link sidekickArea} object instead.
   */
  close: () => {
    window.dispatchEvent(new Event(SidekickOptionsContainerEnum.CLOSE));
  },
};
