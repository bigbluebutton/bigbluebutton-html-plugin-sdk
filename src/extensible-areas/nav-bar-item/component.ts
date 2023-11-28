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

  /**
   * Returns object to be used in the setter for the Navigation Bar. In this case,
   * a button.
   *
   * @param label - label to be displayed in navigation bar button.
   * @param tooltip - label to be displayed when hovering the navigation bar button.
   * @param icon - icon to be used in the navigation bar button. It goes in the left side of it.
   * @param onClick - function to be called when clicking the button.
   * @param position - position to place the navigation bar button.
   * See {@link NavBarItemPosition}
   * @param hasSeparator - boolean indicating whether the navigation bar button has separator
   * (vertical bar)
   * @param disabled - if true, the navigation bar button will not be clickable
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5).
   */
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

  position: NavBarItemPosition;

  /**
   * Returns object to be used in the setter for the Navigation Bar. In this case,
   * an informative label.
   *
   * @param label - label to be displayed in navigation bar information.
   * @param position - position to place the navigation bar information.
   * See {@link NavBarItemPosition}
   * @param hasSeparator - boolean indicating whether the navigation bar information has separator
   * (vertical bar)
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5).
   */
  constructor({
    label = '', position = NavBarItemPosition.RIGHT,
    hasSeparator = true,
  }: NavBarInfoProps) {
    this.label = label;
    this.type = NavBarItemType.INFO;
    this.position = position;
    this.hasSeparator = hasSeparator;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `NavBarInfo_${id}`;
  };
}
