import { SidekickAreaCorePanelEnum } from './enums';

export interface UiCommandsSidekickAreaOptionsPanelObject {
  open: (id?: string) => void;
  openCorePanel: (panel: SidekickAreaCorePanelEnum) => void;
  close: () => void;
}

export interface OpenSidekickAreaOptionsPanelCommandArguments {
  id?: string;
}

export interface OpenSidekickAreaCorePanelCommandArguments {
  panel: SidekickAreaCorePanelEnum;
}
