import { sidekickAreaOptionsPanel } from '../sidekick-area/options/panel/commands';
import { UiCommandsSidekickOptionsContainerObject } from './types';

export const sidekickOptionsContainer: UiCommandsSidekickOptionsContainerObject = {
  /**
   * Opens the sidekick container automatically.
   *
   * @deprecated Use `sidekickArea.options.panel.open` instead.
   */
  open: () => {
    sidekickAreaOptionsPanel.open();
  },

  /**
   * Closes the sidekick container (and sidebar content panel) automatically.
   *
   * @deprecated Use `sidekickArea.options.panel.close` instead.
   */
  close: () => {
    sidekickAreaOptionsPanel.close();
  },
};
