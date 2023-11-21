import { UserCameraDropdownItemType } from './enums';
import {
  UserCameraDropdownItem, UserCameraDropdownOptionProps,
} from './types';

// UserCameraDropdownItem Extensible Area

export class UserCameraDropdownOption implements UserCameraDropdownItem {
  id: string = '';

  type: UserCameraDropdownItemType;

  label: string;

  icon: string;

  onClick: () => void;

  constructor({
    label = '', icon = '', onClick = () => {},
  }: UserCameraDropdownOptionProps) {
    this.label = label;
    this.icon = icon;
    this.onClick = onClick;
    this.type = UserCameraDropdownItemType.OPTION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserCameraDropdownOption_${id}`;
  };
}

export class UserCameraDropdownSeparator implements UserCameraDropdownItem {
  id: string = '';

  type: UserCameraDropdownItemType;

  constructor() {
    this.type = UserCameraDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserCameraDropdownSeparator_${id}`;
  };
}
