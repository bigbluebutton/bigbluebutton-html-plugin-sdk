import { PluginProvidedUiItemDescriptor } from '../base';

/**
 * Interface for a generic item for the action button dropdown.
 */
export interface ActionButtonDropdownInterface extends PluginProvidedUiItemDescriptor{
}

export interface ActionButtonDropdownOptionProps {
  id?: string;
  label: string;
  icon: string;
  tooltip: string;
  dataTest?: string;
  allowed: boolean;
  onClick: () => void;
}
