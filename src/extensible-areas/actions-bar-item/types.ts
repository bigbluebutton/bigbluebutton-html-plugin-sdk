import { PluginProvidedUiItemDescriptor } from '../base';
import { ActionsBarPosition } from './enums';

/**
 * Interface for the generic Actions bar item. (`position` is mandatory)
 */
export interface ActionsBarItem extends PluginProvidedUiItemDescriptor{
  position: ActionsBarPosition;
}

export interface ActionsBarButtonProps {
  icon: string;
  tooltip: string;
  position: ActionsBarPosition;
  onClick: () => void;
}

export interface ActionsBarSeparatorProps {
  position: ActionsBarPosition;
}
