import {
  UserListDropdownInterface, UserListDropdownOptionProps,
  UserListDropdownSeparatorProps,
  UserListDropdownTitleActionProps,
  UserListDropdownTitleActionOnClickArguments,
  UserListDropdownFixedContentInformationProps,
  UserListDropdownGenericContentInformationProps,
} from './types';
import { UserListDropdownItemType, UserListDropdownSeparatorPosition } from './enums';

// UserListDropdown Extensible Area

export class UserListDropdownOption implements UserListDropdownInterface {
  id: string = '';

  userId: string;

  type: UserListDropdownItemType;

  label: string;

  icon: string;

  tooltip: string;

  allowed: boolean;

  onClick: () => void;

  /**
   * Returns object to be used in the setter for the User List Dropdown. In this case,
   * a button.
   *
   * @param label - label to be displayed in user list dropdown option.
   * @param tooltip - label to be displayed when hovering the user list dropdown option.
   * @param icon - icon to be used in the user list dropdown option. It goes in the left side of it.
   * @param onClick - function to be called when clicking the option.
   * @param allowed - if false, the use list dropdown  will not appear in the dropdown.
   * @param userId - the userId in which this dropdown option will appear when the user
   * list item is clicked.
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5).
   */
  constructor({
    label = '', icon = '', tooltip = '', allowed = true, onClick = () => {},
    userId = '',
  }: UserListDropdownOptionProps) {
    this.userId = userId;
    this.label = label;
    this.icon = icon;
    this.tooltip = tooltip;
    this.allowed = allowed;
    this.onClick = onClick;
    this.type = UserListDropdownItemType.OPTION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserListDropdownOption_${id}`;
  };
}

export class UserListDropdownSeparator implements UserListDropdownInterface {
  id: string = '';

  userId: string;

  position: UserListDropdownSeparatorPosition = UserListDropdownSeparatorPosition.AFTER;

  type: UserListDropdownItemType;

  /**
   * Returns object to be used in the setter for the User List Dropdown. In this case,
   * a separator.
   *
   * @param userId - the userId in which this dropdown separator will appear when the user
   * list item is clicked.
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5).
   */
  constructor({ userId = '', position = UserListDropdownSeparatorPosition.AFTER }: UserListDropdownSeparatorProps) {
    this.userId = userId;
    this.position = position;
    this.type = UserListDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserListDropdownSeparator_${id}`;
  };
}

export class UserListDropdownFixedContentInformation implements UserListDropdownInterface {
  id: string = '';

  userId: string;

  type: UserListDropdownItemType;

  label: string;

  icon: string;

  iconRight: string;

  textColor: string;

  allowed: boolean;

  /**
   * Returns object to be used in the setter for the User List Dropdown. In this case,
   * a button.
   *
   * @param label - label to be displayed in user list dropdown information.
   * @param icon - icon to be used in the user list dropdown information.
   * It goes on the left side of it.
   * @param iconRight - icon to be used in the user list dropdown information.
   * It goes on the right side of it.
   * @param allowed - if false, the use list dropdown  will not appear in the dropdown.
   * @param textColor - Color that the text will have.
   * @param userId - the userId in which this dropdown information will appear when the user
   * list item is clicked.
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5).
   */
  constructor({
    label = '', icon = '', iconRight = '', allowed = true,
    userId = '', textColor = '',
  }: UserListDropdownFixedContentInformationProps) {
    this.userId = userId;
    this.label = label;
    this.icon = icon;
    this.iconRight = iconRight;
    this.textColor = textColor;
    this.allowed = allowed;
    this.type = UserListDropdownItemType.FIXED_CONTENT_INFORMATION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserListDropdownFixedContentInformation_${id}`;
  };
}

export class UserListDropdownGenericContentInformation
implements UserListDropdownInterface {
  id: string = '';

  userId: string;

  allowed: boolean;

  type: UserListDropdownItemType;

  contentFunction: (element: HTMLElement) => void;

  /**
   * Returns object to be used in the setter for the User List Dropdown. In this case,
   * a button.
   *
   * @param label - label to be displayed in user list dropdown information.
   * @param icon - icon to be used in the user list dropdown information.
   * It goes on the left side of it.
   * @param iconRight - icon to be used in the user list dropdown information.
   * It goes on the right side of it.
   * @param allowed - if false, the use list dropdown  will not appear in the dropdown.
   * @param textColor - Color that the text will have.
   * @param userId - the userId in which this dropdown information will appear when the user
   * list item is clicked.
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5).
   */
  constructor({
    contentFunction, allowed = true,
    userId = '',
  }: UserListDropdownGenericContentInformationProps) {
    this.userId = userId;
    this.allowed = allowed;
    this.contentFunction = contentFunction;
    this.type = UserListDropdownItemType.GENERIC_CONTENT_INFORMATION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserListDropdownGenericContentInformation_${id}`;
  };
}

export class UserListDropdownTitleAction implements UserListDropdownInterface {
  id: string = '';

  userId: string;

  type: UserListDropdownItemType;

  icon: string;

  tooltip: string;

  onClick: (args: UserListDropdownTitleActionOnClickArguments) => void;

  /**
   * Returns object to be used in the setter for the User List Dropdown. In this case,
   * a button (action) for the title.
   *
   * @param onClick - onClick function.
   * @param tooltip - quick explanatory message that will appear when user hover the action.
   * @param icon - icon to be used in the user list dropdown title action.
   * It goes on the left side of it.
   * @param userId - the userId in which this dropdown title action will appear when the user
   * list item is clicked.
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5).
   */
  constructor({
    icon = '', userId = '', onClick, tooltip,
  }: UserListDropdownTitleActionProps) {
    this.userId = userId;
    this.icon = icon;
    this.tooltip = tooltip;
    this.onClick = onClick;
    this.type = UserListDropdownItemType.TITLE_ACTION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserListDropdownTitleAction_${id}`;
  };
}
