import { SidekickAreaOptionsEnum } from './enums';
import { sidekickAreaOptionsPanel } from './panel/commands';
import {
  RemoveGenericContentSidekickAreaBadgeCommandArguments,
  RenameGenericContentSidekickAreaCommandArguments,
  SetGenericContentSidekickAreaBadgeCommandArguments,
  UiCommandsSidekickAreaOptionsObject,
} from './types';

export const sidekickAreaOptions: UiCommandsSidekickAreaOptionsObject = {
  panel: sidekickAreaOptionsPanel,
  /**
   * Rename Generic Sidekick Content's menu (Option's name)
   */
  renameGenericContentMenu: (id: string, newName: string) => {
    window.dispatchEvent(new CustomEvent<RenameGenericContentSidekickAreaCommandArguments>(
      SidekickAreaOptionsEnum.RENAME_GENERIC_CONTENT_MENU,
      {
        detail: {
          id,
          newName,
        },
      },
    ));
  },

  /**
   * Rename Generic Sidekick Content's Section (Section that the option belongs name)
   */
  renameGenericContentSection: (id: string, newName: string) => {
    window.dispatchEvent(new CustomEvent<RenameGenericContentSidekickAreaCommandArguments>(
      SidekickAreaOptionsEnum.RENAME_GENERIC_CONTENT_SECTION,
      {
        detail: {
          id,
          newName,
        },
      },
    ));
  },

  /**
   * Set the badge of the sidekick option menu
   */
  setMenuBadge: (id: string, badgeContent: string) => {
    window.dispatchEvent(new CustomEvent<SetGenericContentSidekickAreaBadgeCommandArguments>(
      SidekickAreaOptionsEnum.SET_GENERIC_CONTENT_BADGE,
      {
        detail: {
          id,
          badgeContent,
        },
      },
    ));
  },

  /**
   * Remove the badge of the sidekick option menu
   */
  removeMenuBadge: (id: string) => {
    window.dispatchEvent(new CustomEvent<RemoveGenericContentSidekickAreaBadgeCommandArguments>(
      SidekickAreaOptionsEnum.REMOVE_GENERIC_CONTENT_BADGE,
      {
        detail: {
          id,
        },
      },
    ));
  },
};
