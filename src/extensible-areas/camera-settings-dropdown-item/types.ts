import { PluginProvidedUiItemDescriptor } from '../base';

/**
 * Camera Settings Dropdown Item - The general Camera settings extensible area
 *
 * @remarks
 * To make this dropdown appear, the user needs to enter with webcam.
 * This will make a small downward arrow appear in the camera icon (the chevron).
 */
export interface CameraSettingsDropdownInterface extends PluginProvidedUiItemDescriptor{
}

export interface CameraSettingsDropdownOptionProps {
  label: string;
  icon: string;
  onClick: () => void;
}
