import { NavBarItemType, NavBarItemPosition } from './enums';
import {
  NavBarItem, NavBarButtonProps,
  NavBarInfoProps,
} from './types';

// NavBarItem Extensible Area

export class NavBarButton implements NavBarItem {
  id: string = '';

  type: NavBarItemType;

  label: string;

  icon: string;

  tooltip: string;

  disabled: boolean;

  position: NavBarItemPosition;

  hasSeparator: boolean;

  onClick: () => void;

  constructor({
    label = '', icon = '', tooltip = '', disabled = true, onClick = () => {},
    position = NavBarItemPosition.RIGHT, hasSeparator = true,
  }: NavBarButtonProps) {
    this.label = label;
    this.icon = icon;
    this.tooltip = tooltip;
    this.disabled = disabled;
    this.onClick = onClick;
    this.type = NavBarItemType.BUTTON;
    this.hasSeparator = hasSeparator;
    this.position = position;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `NavBarButton_${id}`;
  };
}

export class NavBarInfo implements NavBarItem {
  id: string = '';

  type: NavBarItemType;

  label: string;

  hasSeparator: boolean;

  icon: string;

  disabled: boolean;

  position: NavBarItemPosition;

  constructor({
    label = '', icon = '', disabled = true, position = NavBarItemPosition.RIGHT,
    hasSeparator = true,
  }: NavBarInfoProps) {
    this.label = label;
    this.icon = icon;
    this.disabled = disabled;
    this.type = NavBarItemType.INFO;
    this.position = position;
    this.hasSeparator = hasSeparator;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `NavBarInfo_${id}`;
  };
}
