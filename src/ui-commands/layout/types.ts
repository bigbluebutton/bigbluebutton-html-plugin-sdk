import { ChangeEnforcedLayoutTypeEnum, EnforcedLayoutTypeEnum } from './enums';

export interface ChangeEnforcedLayoutCommandArguments {
  layoutType: ChangeEnforcedLayoutTypeEnum;
}

export interface SetEnforcedLayoutCommandArguments {
  layoutType: EnforcedLayoutTypeEnum;
}

export type ChangeEnforcedLayout = (layoutType: ChangeEnforcedLayoutTypeEnum) => void;

export type SetEnforcedLayoutFunction = (layoutType: EnforcedLayoutTypeEnum) => void;

export interface UiCommandsLayoutObject {
  changeEnforcedLayout: ChangeEnforcedLayout;
  setEnforcedLayout: SetEnforcedLayoutFunction;
}
