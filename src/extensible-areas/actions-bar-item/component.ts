import { ActionsBarPosition, ActionsBarItemType } from './enums';
import {
  ActionsBarItem, ActionsBarButtonProps,
  ActionsBarButtonDropdownItem, ActionsBarSeparatorProps,
} from './types';

// ActionsBarItem Extensible Area

export class ActionsBarButton implements ActionsBarItem {
  id: string = '';

  type: ActionsBarItemType;

  icon: string;

  tooltip: string;

  allowed: boolean;

  hasDropdownButton: boolean;

  listOfDropdownItems: ActionsBarButtonDropdownItem[];

  position: ActionsBarPosition;

  onClick: () => void;

  constructor({
    icon = '', tooltip = '', allowed = true, onClick = () => {},
    hasDropdownButton = false, listOfDropdownItems = [], position = ActionsBarPosition.RIGHT,
  }: ActionsBarButtonProps) {
    this.icon = icon;
    this.tooltip = tooltip;
    this.allowed = allowed;
    this.onClick = onClick;
    this.hasDropdownButton = hasDropdownButton;
    this.listOfDropdownItems = listOfDropdownItems;
    this.position = position;
    this.type = ActionsBarItemType.BUTTON;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `ActionsBarButton_${id}`;
  };
}

export class ActionsBarSeparator implements ActionsBarItem {
  position: ActionsBarPosition;

  id: string = '';

  type: ActionsBarItemType;

  constructor({
    position = ActionsBarPosition.RIGHT,
  }: ActionsBarSeparatorProps) {
    this.position = position;
    this.type = ActionsBarItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `ActionsBarSeparator_${id}`;
  };
}
