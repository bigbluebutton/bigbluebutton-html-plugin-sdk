import { PluginProvidedUiItemDescriptor } from '../base';

export interface PresentationDropdownItem extends PluginProvidedUiItemDescriptor{
}

export interface PresentationDropdownOptionProps {
  label: string;
  icon: string;
  onClick: () => void;
}
