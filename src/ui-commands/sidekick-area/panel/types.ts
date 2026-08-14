import { SidekickAreaCorePanelEnum } from './enums';

export interface UiCommandsSidekickAreaPanelObject {
  open: (id: string | SidekickAreaCorePanelEnum) => void;
  close: (id?: string | SidekickAreaCorePanelEnum) => void;
}

export interface SidekickAreaPanelCommandArguments {
  id?: string | SidekickAreaCorePanelEnum;
}
