import { LayoutComponentListEnum } from './enums';

export interface UiCommandsLayoutObject {
    set: (layoutToSet: LayoutComponentListEnum) => void;
    unset: (layoutToUnset: LayoutComponentListEnum) => void;
}
