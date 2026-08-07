import { SidekickAreaCorePanelEnum } from './enums';

export interface UiCommandsSidekickAreaPanelObject {
  open: (id?: string) => void;
  openCorePanel: (panel: SidekickAreaCorePanelEnum) => void;
  close: () => void;
}

export interface OpenSidekickAreaPanelCommandArguments {
  id?: string;
}

export interface OpenSidekickAreaCorePanelCommandArguments {
  panel: SidekickAreaCorePanelEnum;
}
