import { PluginProvidedUiItemDescriptor } from '../base';
import { NavBarItemPosition } from './enums';

export interface NavBarInterface extends PluginProvidedUiItemDescriptor{
  position: NavBarItemPosition;
  hasSeparator: boolean;
}

export interface NavBarButtonProps {
  label: string;
  icon: string;
  tooltip: string;
  disabled: boolean;
  hasSeparator: boolean;
  position: NavBarItemPosition;
  onClick: () => void;
}

export interface NavBarInfoProps {
  label: string;
  hasSeparator: boolean;
  position: NavBarItemPosition;
}
