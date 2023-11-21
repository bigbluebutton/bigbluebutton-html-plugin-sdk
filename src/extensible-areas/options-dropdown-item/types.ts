import { PluginProvidedUiItemDescriptor } from '../base';

export interface OptionsDropdownItem extends PluginProvidedUiItemDescriptor{
}

export interface OptionsDropdownOptionProps {
  label: string;
  icon: string;
  onClick: () => void;
}
