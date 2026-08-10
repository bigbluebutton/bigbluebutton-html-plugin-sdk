import { SidekickAreaCorePanelEnum, SidekickAreaPanelEnum } from './enums';
import {
  SidekickAreaPanelCommandArguments,
  UiCommandsSidekickAreaPanelObject,
} from './types';

const dispatch = (
  command: SidekickAreaPanelEnum,
  id?: string,
  panel?: SidekickAreaCorePanelEnum,
) => {
  window.dispatchEvent(new CustomEvent<SidekickAreaPanelCommandArguments>(
    command,
    {
      detail: {
        id,
        panel,
      },
    },
  ));
};

export const sidekickAreaPanel: UiCommandsSidekickAreaPanelObject = {
  /**
   * Opens a panel in the sidekick area.
   *
   * @param id Id of a generic content sidekick area, as returned by
   * `pluginApi.setGenericContentItems`.
   * @param panel Core panel to open instead, read only when no id is given. Core
   * panels the user could not open themselves, such as Polls for a viewer, are ignored.
   */
  open: (id?: string, panel?: SidekickAreaCorePanelEnum) => {
    dispatch(SidekickAreaPanelEnum.OPEN, id, panel);
  },

  /**
   * Closes a panel in the sidekick area, but only if it is on display, so a plugin
   * does not close a panel it does not own. Passing neither argument closes the
   * sidekick area altogether.
   *
   * @param id Id of a generic content sidekick area.
   * @param panel Core panel to close instead, read only when no id is given.
   */
  close: (id?: string, panel?: SidekickAreaCorePanelEnum) => {
    dispatch(SidekickAreaPanelEnum.CLOSE, id, panel);
  },
};
