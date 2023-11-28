import { PluginProvidedUiItemDescriptor } from '../base';

/**
 * User List Dropdown Item - The general user list dropdown extensible area item
 *
 * @remarks
 * This dropdown is located on the bottom left corner of the user webcam area.
 * Mandatory to have the `userId`
 */
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
