import { PluginProvidedUiItemDescriptor } from '../base';

/**
 * Audio Settings Dropdown Item - The general Audio settings extensible area
 *
 * @remarks
 * To make this dropdown appear, the user needs to enter with audio, either listen only
 * or microphone. This will make a small downward arrow appear (chevron).
 */
export interface AudioSettingsDropdownInterface extends PluginProvidedUiItemDescriptor{
}

export interface AudioSettingsDropdownOptionProps {
  label: string;
  icon: string;
  onClick: () => void;
}
