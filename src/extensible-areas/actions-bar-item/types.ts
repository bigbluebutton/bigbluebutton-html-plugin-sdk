import { PluginProvidedUiItemDescriptor } from '../base';
import { ActionsBarPosition } from './enums';

/**
 * Interface for the generic Actions bar item. (`position` is mandatory)
 */
export interface ActionsBarInterface extends PluginProvidedUiItemDescriptor{
  position: ActionsBarPosition;
}

export interface ActionsBarButtonProps {
  id?: string;
  icon: string;
  tooltip: string;
  position: ActionsBarPosition;
  onClick: () => void;
}

export interface ActionsBarSeparatorProps {
  position: ActionsBarPosition;
}
