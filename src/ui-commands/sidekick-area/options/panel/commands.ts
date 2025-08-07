import { SidekickAreaOptionsPanelEnum } from './enums';
import { UiCommandsSidekickAreaOptionsPanelObject } from './types';

export const sidekickAreaOptionsPanel: UiCommandsSidekickAreaOptionsPanelObject = {
  /**
   * Opens the sidekick container automatically.
   */
  open: () => {
    window.dispatchEvent(new Event(SidekickAreaOptionsPanelEnum.OPEN));
  },

  /**
   * Closes the sidekick container (and sidebard content panel) automatically.
   */
  close: () => {
    window.dispatchEvent(new Event(SidekickAreaOptionsPanelEnum.CLOSE));
  },
};
