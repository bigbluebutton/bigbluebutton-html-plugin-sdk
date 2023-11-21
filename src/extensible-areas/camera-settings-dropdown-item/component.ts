import { CameraSettingsDropdownItemType } from './enums';
import {
  CameraSettingsDropdownItem, CameraSettingsDropdownOptionProps,
} from './types';

// CameraSettingsDropdownItem Extensible Area

export class CameraSettingsDropdownOption implements CameraSettingsDropdownItem {
  id: string = '';

  type: CameraSettingsDropdownItemType;

  label: string;

  icon: string;

  onClick: () => void;

  constructor({
    label = '', icon = '', onClick = () => {},
  }: CameraSettingsDropdownOptionProps) {
    this.label = label;
    this.icon = icon;
    this.onClick = onClick;
    this.type = CameraSettingsDropdownItemType.OPTION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `CameraSettingsDropdownOption_${id}`;
  };
}

export class CameraSettingsDropdownSeparator implements CameraSettingsDropdownItem {
  id: string = '';

  type: CameraSettingsDropdownItemType;

  constructor() {
    this.type = CameraSettingsDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `CameraSettingsDropdownSeparator_${id}`;
  };
}
