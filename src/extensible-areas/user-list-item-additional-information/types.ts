import { PluginProvidedUiItemDescriptor } from '../base';

/**
 * User List Item Additional Information - The general user list item additional information item
 *
 * @remarks
 * This area is essentially below the user name of an item of the user list, it is possible
 * to add icons, and labels, for now.
 * Mandatory to have the `userId`
 */
export interface UserListItemAdditionalInformationInterface extends PluginProvidedUiItemDescriptor {
  userId: string;
}
export interface UserListItemIconProps {
  userId: string;
  icon: string;
}

export interface UserListItemLabelProps {
  userId: string;
  icon: string;
  label: string;
}
