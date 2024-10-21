import { UserCameraDropdownItemType } from './enums';
import {
  OnclickFunctionCallbackArguments,
  UserCameraDropdownCallbackFunctionsArguments,
  UserCameraDropdownInterface, UserCameraDropdownOptionProps,
  UserCameraDropdownSeparatorProps,
} from './types';

// UserCameraDropdown Extensible Area

export class UserCameraDropdownOption implements UserCameraDropdownInterface {
  id: string = '';

  type: UserCameraDropdownItemType;

  label: string;

  icon: string;

  onClick: (args: OnclickFunctionCallbackArguments) => void;

  displayFunction?: (args: UserCameraDropdownCallbackFunctionsArguments) => boolean;

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
    id, label = '', icon = '', onClick = () => {},
    displayFunction = () => true,
  }: UserCameraDropdownOptionProps) {
    if (id) {
      this.id = id;
    }
    this.displayFunction = displayFunction;
    this.label = label;
    this.icon = icon;
    this.onClick = onClick;
    this.type = UserCameraDropdownItemType.OPTION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserCameraDropdownOption_${id}`;
  };
}

export class UserCameraDropdownSeparator implements UserCameraDropdownInterface {
  id: string = '';

  type: UserCameraDropdownItemType;

  displayFunction?: (args: UserCameraDropdownCallbackFunctionsArguments) => boolean;

  /**
   * Returns object to be used in the setter for User Camera Dropdown. In this case
   * a separator.
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5)
   */
  constructor({
    displayFunction,
  }: UserCameraDropdownSeparatorProps = { displayFunction: () => true }) {
    this.displayFunction = displayFunction;
    this.type = UserCameraDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserCameraDropdownSeparator_${id}`;
  };
}
