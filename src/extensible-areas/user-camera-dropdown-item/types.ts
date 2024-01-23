import { PluginProvidedUiItemDescriptor } from '../base';

/**
 * User Camera Dropdown Item - The general user camera dropdown extensible area item
 *
 * @remarks
 * This dropdown is located on the bottom left corner of the user webcam area
 */
export interface UserCameraDropdownInterface extends PluginProvidedUiItemDescriptor{
}

export interface UserCameraDropdownOptionProps {
  label: string;
  icon: string;
  onClick: () => void;
}
