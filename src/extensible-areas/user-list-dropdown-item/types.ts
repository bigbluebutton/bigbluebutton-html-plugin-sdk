import { PluginProvidedUiItemDescriptor } from '../base';

export interface UserListDropdownItem extends PluginProvidedUiItemDescriptor{
  userId: string;
}

export interface UserListDropdownOptionProps {
  label: string;
  icon: string;
  tooltip: string;
  allowed: boolean;
  userId: string;
  onClick: () => void;
}

export interface UserListDropdownSeparatorProps {
  userId: string;
}

export interface UserListDropdownInformationProps {
  label: string;
  icon?: string;
  iconRight?: string;
  allowed: boolean;
  userId: string;
  textColor: string;
}
