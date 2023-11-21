import { PluginProvidedUiItemDescriptor } from '../base';
import { ActionsBarPosition } from './enums';

export interface ActionsBarItem extends PluginProvidedUiItemDescriptor{
  position: ActionsBarPosition;
}

export interface ActionsBarButtonDropdownItem {
  label: string;
  icon: string;
  tooltip: string;
  allowed: boolean;
  userId: string;
  onClick: () => void;
}

export interface ActionsBarButtonProps {
  icon: string;
  tooltip: string;
  allowed: boolean;
  hasDropdownButton: boolean;
  listOfDropdownItems: ActionsBarButtonDropdownItem[];
  position: ActionsBarPosition;
  onClick: () => void;
}

export interface ActionsBarSeparatorProps {
  position: ActionsBarPosition;
}
