import { SidekickAreaCorePanelEnum, SidekickAreaOptionsPanelEnum } from './enums';
import {
  OpenSidekickAreaCorePanelCommandArguments,
  OpenSidekickAreaOptionsPanelCommandArguments,
  UiCommandsSidekickAreaOptionsPanelObject,
} from './types';

export const sidekickAreaOptionsPanel: UiCommandsSidekickAreaOptionsPanelObject = {
  /**
   * Opens the sidekick panel automatically.
   *
   * @param id Id of the generic content sidekick area, as returned by
   * `pluginApi.setGenericContentItems`. When omitted, no panel is selected.
   */
  open: (id?: string) => {
    window.dispatchEvent(new CustomEvent<OpenSidekickAreaOptionsPanelCommandArguments>(
      SidekickAreaOptionsPanelEnum.OPEN,
      {
        detail: {
          id,
        },
      },
    ));
  },

  /**
   * Opens one of the core panels, such as Polls.
   *
   * @param panel Core panel to be opened. Polls, Timer and Breakout are ignored
   * unless the user could already open them from the sidebar navigation.
   */
  openCorePanel: (panel: SidekickAreaCorePanelEnum) => {
    window.dispatchEvent(new CustomEvent<OpenSidekickAreaCorePanelCommandArguments>(
      SidekickAreaOptionsPanelEnum.OPEN_CORE_PANEL,
      {
        detail: {
          panel,
        },
      },
    ));
  },

  /**
   * Closes the sidekick container (and sidebar content panel) automatically.
   */
  close: () => {
    window.dispatchEvent(new Event(SidekickAreaOptionsPanelEnum.CLOSE));
  },
};
