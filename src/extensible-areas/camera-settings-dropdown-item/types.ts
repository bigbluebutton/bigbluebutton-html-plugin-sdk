import { PluginProvidedUiItemDescriptor } from '../base';

export interface CameraSettingsDropdownItem extends PluginProvidedUiItemDescriptor{
}

export interface CameraSettingsDropdownOptionProps {
  label: string;
  icon: string;
  onClick: () => void;
}
