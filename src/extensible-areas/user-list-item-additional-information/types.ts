import { PluginProvidedUiItemDescriptor } from '../base';

export interface UserListItemAdditionalInformation extends PluginProvidedUiItemDescriptor {
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
