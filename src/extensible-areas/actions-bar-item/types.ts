import { ChangeEvent, MouseEvent } from 'react';
import { PluginProvidedUiItemDescriptor } from '../base';
import { ActionsBarItemType, ActionsBarPosition } from './enums';

/**
 * Interface for the generic Actions bar item. (`position` is mandatory)
 */
export interface ActionsBarInterface extends PluginProvidedUiItemDescriptor{
  position: ActionsBarPosition;
}

export interface ActionsBarItemProps {
  id?: string;
  position: ActionsBarPosition;
  type: ActionsBarItemType;
}

export interface ActionsBarButtonIconSvg {
  svgContent: React.SVGProps<SVGSVGElement>;
}

export interface ActionsBarButtonIconName {
  /**
   * Default icon name defined by BBB (see options there).
   */
  iconName: string;
}

export type ActionsBarIconType = ActionsBarButtonIconSvg | ActionsBarButtonIconName

export interface ActionsBarButtonProps {
  id?: string;
  icon: ActionsBarIconType;
  tooltip: string;
  position: ActionsBarPosition;
  onClick: () => void;
}

export interface ActionsBarSeparatorProps {
  position: ActionsBarPosition;
  icon?: string;
}

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface ToggleGroupOption extends SelectOption {
}

export interface ActionsBarSelectorProps {
  id?: string;
  title: string;
  options: SelectOption[];
  defaultOption?: SelectOption;
  onChange: (value: string | number, event: ChangeEvent<HTMLInputElement>) => void;
  position: ActionsBarPosition;
  width?: number;
}

export interface ActionsBarToggleGroupProps {
  id?: string;
  title: string;
  options: ToggleGroupOption[];
  defaultOption?: ToggleGroupOption;
  exclusive?: boolean;
  onChange: (values: string | number | string[] | number[], event: MouseEvent<HTMLElement>) => void;
  position: ActionsBarPosition;
}
