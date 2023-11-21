import { UserListItemAdditionalInformationType } from './enums';
import {
  UserListItemAdditionalInformation, UserListItemIconProps,
  UserListItemLabelProps,
} from './types';

// UserListItemAdditionalInformation Extensible Area

export class UserListItemIcon implements UserListItemAdditionalInformation {
  id: string = '';

  type: UserListItemAdditionalInformationType;

  userId: string;

  icon: string;

  constructor({
    icon = '', userId = '',
  }: UserListItemIconProps) {
    this.icon = icon;
    this.userId = userId;
    this.type = UserListItemAdditionalInformationType.ICON;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserListItemIcon_${id}`;
  };
}

export class UserListItemLabel implements UserListItemAdditionalInformation {
  id: string = '';

  type: UserListItemAdditionalInformationType;

  userId: string;

  icon: string;

  label: string;

  constructor({
    icon = '', userId = '', label = '',
  }: UserListItemLabelProps) {
    this.icon = icon;
    this.label = label;
    this.userId = userId;
    this.type = UserListItemAdditionalInformationType.LABEL;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserListItemLabel_${id}`;
  };
}
