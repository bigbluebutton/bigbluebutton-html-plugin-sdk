import { PluginProvidedUiItemDescriptor } from '../base';

/**
 * Options Dropdown Item - The general options dropdown extensible area item
 *
 * @remarks
 * This dropdown is related to the options menu on the top right corner of the UI
 * (the 3 dots)
 */
export interface OptionsDropdownInterface extends PluginProvidedUiItemDescriptor{
}

export interface OptionsDropdownOptionProps {
  label: string;
  icon: string;
  onClick: () => void;
}
