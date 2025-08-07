import { UiCommandsSidekickAreaOptionsPanelObject } from './panel/types';

export interface UiCommandsSidekickAreaOptionsObject {
  panel: UiCommandsSidekickAreaOptionsPanelObject;
  renameGenericContentMenu: (id: string, newName: string) => void;
  renameGenericContentSection: (id: string, newName: string) => void;
  setMenuBadge: (id: string, badgeContent: string) => void,
  removeMenuBadge: (id: string) => void,
}

export interface RenameGenericContentSidekickAreaCommandArguments {
  id: string;
  newName: string;
}

export interface SetGenericContentSidekickAreaBadgeCommandArguments {
  id: string;
  badgeContent: string;
}

export interface RemoveGenericContentSidekickAreaBadgeCommandArguments {
  id: string;
}
