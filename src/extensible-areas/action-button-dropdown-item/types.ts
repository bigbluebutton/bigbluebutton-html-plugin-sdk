import { PluginProvidedUiItemDescriptor } from '../base';

export interface ActionButtonDropdownItem extends PluginProvidedUiItemDescriptor{
}

export interface ActionButtonDropdownOptionProps {
  label: string;
  icon: string;
  tooltip: string;
  allowed: boolean;
  onClick: () => void;
}
