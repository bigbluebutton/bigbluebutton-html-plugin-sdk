import { SidekickAreaCorePanelEnum, SidekickAreaPanelEnum } from './enums';
import {
  OpenSidekickAreaCorePanelCommandArguments,
  OpenSidekickAreaPanelCommandArguments,
  UiCommandsSidekickAreaPanelObject,
} from './types';

export const sidekickAreaPanel: UiCommandsSidekickAreaPanelObject = {
  /**
   * Opens a generic content sidekick area panel.
   *
   * @param id Id of the generic content sidekick area, as returned by
   * `pluginApi.setGenericContentItems`. When omitted, no panel is selected.
   */
  open: (id?: string) => {
    window.dispatchEvent(new CustomEvent<OpenSidekickAreaPanelCommandArguments>(
      SidekickAreaPanelEnum.OPEN,
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
      SidekickAreaPanelEnum.OPEN_CORE_PANEL,
      {
        detail: {
          panel,
        },
      },
    ));
  },

  /**
   * Closes the panel currently displayed in the sidekick area.
   */
  close: () => {
    window.dispatchEvent(new Event(SidekickAreaPanelEnum.CLOSE));
  },
};
