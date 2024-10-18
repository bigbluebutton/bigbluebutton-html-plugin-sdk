import { PluginProvidedUiItemDescriptor } from '../base';
import { UserListDropdownSeparatorPosition } from './enums';

/**
 * User List Dropdown Item - The general user list dropdown extensible area item
 *
 * @remarks
 * This dropdown is located on the bottom left corner of the user webcam area.
 * Mandatory to have the `userId`
 */
export interface UserListDropdownInterface extends PluginProvidedUiItemDescriptor{
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
  position?: UserListDropdownSeparatorPosition;
}

export interface UserListDropdownGenericContentInformationProps {
  id?: string;
  contentFunction: (element: HTMLElement) => void;
  allowed: boolean;
  userId: string;
}

export interface UserListDropdownFixedContentInformationProps {
  id?: string;
  label: string;
  icon?: string;
  iconRight?: string;
  allowed: boolean;
  userId: string;
  textColor: string;
}

export interface UserListDropdownTitleActionOnClickArguments {
  browserEvent: React.MouseEvent<HTMLElement>;
}

export interface UserListDropdownTitleActionProps {
  id?: string;
  tooltip: string;
  icon: string;
  userId: string;
  onClick: (args: UserListDropdownTitleActionOnClickArguments) => void;
}
