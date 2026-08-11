import { SidekickAreaCorePanelEnum, SidekickAreaPanelEnum } from './enums';
import {
  SidekickAreaPanelCommandArguments,
  UiCommandsSidekickAreaPanelObject,
} from './types';

const dispatch = (
  command: SidekickAreaPanelEnum,
  id?: string | SidekickAreaCorePanelEnum,
) => {
  window.dispatchEvent(new CustomEvent<SidekickAreaPanelCommandArguments>(
    command,
    {
      detail: {
        id,
      },
    },
  ));
};

export const sidekickAreaPanel: UiCommandsSidekickAreaPanelObject = {
  /**
   * Opens a panel in the sidekick area.
   *
   * @param id Id of a generic content sidekick area, as returned by
   * `pluginApi.setGenericContentItems`, or a core panel from `SidekickAreaCorePanelEnum`.
   * Core panels the user could not open themselves, such as Polls for a viewer, are ignored.
   */
  open: (id: string | SidekickAreaCorePanelEnum) => {
    dispatch(SidekickAreaPanelEnum.OPEN, id);
  },

  /**
   * Closes a panel in the sidekick area, but only if it is on display, so a plugin
   * does not close a panel it does not own. Passing no argument closes the
   * sidekick area altogether.
   *
   * @param id Id of a generic content sidekick area, or a core panel from
   * `SidekickAreaCorePanelEnum`.
   */
  close: (id?: string | SidekickAreaCorePanelEnum) => {
    dispatch(SidekickAreaPanelEnum.CLOSE, id);
  },
};
