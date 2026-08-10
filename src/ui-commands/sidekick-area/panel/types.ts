import { SidekickAreaCorePanelEnum } from './enums';

export interface UiCommandsSidekickAreaPanelObject {
  open: (id?: string, panel?: SidekickAreaCorePanelEnum) => void;
  close: (id?: string, panel?: SidekickAreaCorePanelEnum) => void;
}

export interface SidekickAreaPanelCommandArguments {
  id?: string;
  panel?: SidekickAreaCorePanelEnum;
}
