import { PluginProvidedUiItemDescriptor } from '../base';

export interface UserCameraDropdownItem extends PluginProvidedUiItemDescriptor{
}

export interface UserCameraDropdownOptionProps {
  label: string;
  icon: string;
  onClick: () => void;
}
