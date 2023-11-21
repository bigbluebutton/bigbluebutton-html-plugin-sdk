import { PluginProvidedUiItemDescriptor } from '../base';
import { NavBarItemPosition } from './enums';

export interface NavBarItem extends PluginProvidedUiItemDescriptor{
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
  icon: string;
  disabled: boolean;
  position: NavBarItemPosition;
}
