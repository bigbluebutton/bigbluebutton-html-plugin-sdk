import {
  UserListDropdownItem, UserListDropdownOptionProps,
  UserListDropdownSeparatorProps, UserListDropdownInformationProps,
} from './types';
import { UserListDropdownItemType } from './enums';

// UserListDropdownItem Extensible Area

export class UserListDropdownOption implements UserListDropdownItem {
  id: string = '';

  userId: string;

  type: UserListDropdownItemType;

  label: string;

  icon: string;

  tooltip: string;

  allowed: boolean;

  onClick: () => void;

  constructor({
    label = '', icon = '', tooltip = '', allowed = true, onClick = () => {},
    userId = '',
  }: UserListDropdownOptionProps) {
    this.userId = userId;
    this.label = label;
    this.icon = icon;
    this.tooltip = tooltip;
    this.allowed = allowed;
    this.onClick = onClick;
    this.type = UserListDropdownItemType.OPTION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserListDropdownOption_${id}`;
  };
}

export class UserListDropdownSeparator implements UserListDropdownItem {
  id: string = '';

  userId: string;

  type: UserListDropdownItemType;

  constructor({ userId = '' }: UserListDropdownSeparatorProps) {
    this.userId = userId;
    this.type = UserListDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserListDropdownSeparator_${id}`;
  };
}

export class UserListDropdownInformation implements UserListDropdownItem {
  id: string = '';

  userId: string;

  type: UserListDropdownItemType;

  label: string;

  icon: string;

  iconRight: string;

  textColor: string;

  allowed: boolean;

  constructor({
    label = '', icon = '', iconRight = '', allowed = true,
    userId = '', textColor = '',
  }: UserListDropdownInformationProps) {
    this.userId = userId;
    this.label = label;
    this.icon = icon;
    this.iconRight = iconRight;
    this.textColor = textColor;
    this.allowed = allowed;
    this.type = UserListDropdownItemType.INFORMATION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserListDropdownInformation_${id}`;
  };
}
