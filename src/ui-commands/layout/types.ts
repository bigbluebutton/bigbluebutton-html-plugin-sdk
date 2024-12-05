import { ChangeEnforcedLayoutTypeEnum } from './enums';

export interface ChangeEnforcedLayoutCommandArguments {
  layoutType: ChangeEnforcedLayoutTypeEnum;
}

export type ChangeEnforcedLayout = (layoutType: ChangeEnforcedLayoutTypeEnum) => void;

export interface UiCommandsLayoutObject {
  changeEnforcedLayout: ChangeEnforcedLayout;
}
