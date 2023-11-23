import { PluginProvidedUiItemDescriptor } from '../base';

/**
 * Interface for a generic item for the action button dropdown.
 */
export interface ActionButtonDropdownItem extends PluginProvidedUiItemDescriptor{
}

export interface ActionButtonDropdownOptionProps {
  label: string;
  icon: string;
  tooltip: string;
  allowed: boolean;
  onClick: () => void;
}
