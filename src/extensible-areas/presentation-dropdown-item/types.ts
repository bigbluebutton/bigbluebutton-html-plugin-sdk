import { PluginProvidedUiItemDescriptor } from '../base';

/**
 * Presentation Dropdown Item - The general presentation dropdown extensible area item
 *
 * @remarks
 * This dropdown is located when clicking the three dots on the top left corner
 * of the presentation area.
 */
export interface PresentationDropdownItem extends PluginProvidedUiItemDescriptor{
}

export interface PresentationDropdownOptionProps {
  label: string;
  icon: string;
  onClick: () => void;
}
