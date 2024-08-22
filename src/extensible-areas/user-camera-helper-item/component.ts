import { UserCameraHelperItemType, UserCameraHelperItemPosition } from './enums';
import {
  UserCameraHelperButtonProps,
  UserCameraHelperButtonInterface,
  UserCameraHelperButtonOnclickCallback,
  UserCameraHelperCallbackFunctionArguments,
} from './types';

// UserCameraHelper Extensible Area

export class UserCameraHelperButton implements UserCameraHelperButtonInterface {
  id: string = '';

  type: UserCameraHelperItemType;

  label: string;

  displayFunction?: (args: UserCameraHelperCallbackFunctionArguments) => boolean;

  icon: string;

  tooltip: string;

  disabled: boolean;

  position: UserCameraHelperItemPosition;

  onClick: (args: UserCameraHelperButtonOnclickCallback) => void;

  /**
   * Returns object to be used in the setter for the UserCamera Helper. In this case,
   * a button.
   *
   * @param label - label to be displayed in userCamera helper button (Not mandatory).
   * @param tooltip - label to be displayed when hovering the userCamera helper button.
   * @param icon - icon to be used in the userCamera helper button. It goes in the left side of it.
   * @param onClick - function to be called when clicking the button.
   * @param displayFunction - function to tell BBB core which cameras will receive this extensible
   * area.
   * @param position - position to place the userCamera helper button.
   * See {@link UserCameraHelperItemPosition}
   * @param disabled - if true, the userCamera helper button will not be clickable
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5).
   */
  constructor({
    label = '', icon = '', tooltip = '', disabled = true, onClick = () => {},
    position = UserCameraHelperItemPosition.TOP_RIGHT, displayFunction,
  }: UserCameraHelperButtonProps) {
    this.label = label;
    this.icon = icon;
    this.tooltip = tooltip;
    this.disabled = disabled;
    this.onClick = onClick;
    this.displayFunction = displayFunction;
    this.type = UserCameraHelperItemType.BUTTON;
    this.position = position;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserCameraHelperButton_${id}`;
  };
}
