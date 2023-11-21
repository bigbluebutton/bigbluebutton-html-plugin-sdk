import { PluginProvidedUiItemDescriptor } from '../base';

export interface AudioSettingsDropdownItem extends PluginProvidedUiItemDescriptor{
}

export interface AudioSettingsDropdownOptionProps {
  label: string;
  icon: string;
  onClick: () => void;
}
