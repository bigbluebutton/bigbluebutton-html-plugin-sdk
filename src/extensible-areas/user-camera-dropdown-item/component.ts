import { UserCameraDropdownItemType } from './enums';
import {
  UserCameraDropdownItem, UserCameraDropdownOptionProps,
} from './types';

// UserCameraDropdownItem Extensible Area

export class UserCameraDropdownOption implements UserCameraDropdownItem {
  id: string = '';

  type: UserCameraDropdownItemType;

  label: string;

  icon: string;

  onClick: () => void;

  /**
   * Returns object to be used in the setter for User Camera Dropdown. In this case
   * an option.
   *
   * @param label - label to be displayed in the option.
   * @param icon - icon to be displayed in the option. Left side of it.
   * @param onClick - function to be called when clicking the button
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5)
   */
  constructor({
    label = '', icon = '', onClick = () => {},
  }: UserCameraDropdownOptionProps) {
    this.label = label;
    this.icon = icon;
    this.onClick = onClick;
    this.type = UserCameraDropdownItemType.OPTION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserCameraDropdownOption_${id}`;
  };
}

export class UserCameraDropdownSeparator implements UserCameraDropdownItem {
  id: string = '';

  type: UserCameraDropdownItemType;

  /**
   * Returns object to be used in the setter for User Camera Dropdown. In this case
   * a separator.
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5)
   */
  constructor() {
    this.type = UserCameraDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserCameraDropdownSeparator_${id}`;
  };
}
