import { PluginProvidedUiItemDescriptor } from '../base';
import { NavBarItemPosition } from './enums';

export interface NavBarInterface extends PluginProvidedUiItemDescriptor{
  position: NavBarItemPosition;
  hasSeparator: boolean;
}

export interface NavBarButtonProps {
  id?: string;
  label: string;
  icon: string;
  tooltip: string;
  disabled: boolean;
  hasSeparator: boolean;
  position: NavBarItemPosition;
  onClick: () => void;
}

export interface NavBarInfoProps {
  id?: string;
  label: string;
  hasSeparator: boolean;
  position: NavBarItemPosition;
}
