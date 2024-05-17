import { SidekickContentCommandsEnum } from './enums';

export const sidekickContent = {
  /**
   * Minimize the current sidekick content panel
   */
  minimizeCurrentPanel: () => {
    window.dispatchEvent(
      new Event(SidekickContentCommandsEnum.MINIMIZE_CURRENT_PANEL),
    );
  },
};
