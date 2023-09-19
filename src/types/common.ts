import {
  PresentationToolbarItemType,
  UserListDropdownItemType,
  ActionBarItemType,
  ActionBarPosition,
} from '../index';

type PluginProvidedUiItemType = UserListDropdownItemType | PresentationToolbarItemType
  | ActionBarItemType;

export interface PluginProvidedUiItemDescriptor {
  /** Defined by BigBlueButton Plugin Engine. */
  id: string;
  type: PluginProvidedUiItemType;
  // type: UserListDropdownItemType | PresentationToolbarItemType;
  setItemId: (id: string) => void;
}

export interface CustomEventHook<T> {
  data: T;
  hook: string;
}

export interface CustomEventHookWrapper<T> extends Event {
  detail: CustomEventHook<T>;
}

// Extensible Areas

// PresentationToolbarItem Extensible Area

export interface PresentationToolbarItem extends PluginProvidedUiItemDescriptor{}

export interface PresentationToolbarButtonProps {
  label: string;
  tooltip: string;
  onClick: () => void;
}

export class PresentationToolbarButton implements PresentationToolbarItem {
  id: string = '';

  type: PresentationToolbarItemType;

  label: string;

  tooltip: string;

  onClick: () => void;

  constructor({ label = '', tooltip = '', onClick = () => {} }: PresentationToolbarButtonProps) {
    this.label = label;
    this.tooltip = tooltip;
    this.onClick = onClick;
    this.type = PresentationToolbarItemType.BUTTON;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `PresentationToolbarButton_${id}`;
  };
}

export class PresentationToolbarSpinner implements PresentationToolbarItem {
  id: string = '';

  type: PresentationToolbarItemType;

  constructor() {
    this.type = PresentationToolbarItemType.SPINNER;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `PresentationToolbarButton_${id}`;
  };
}

export interface PresentationToolbarSeparatorProps {
  width: number;
}
export class PresentationToolbarSeparator implements PresentationToolbarItem {
  id: string = '';

  type: PresentationToolbarItemType;

  width: number;

  constructor({ width } : PresentationToolbarSeparatorProps) {
    this.width = width;
    this.type = PresentationToolbarItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `PresentationToolbarButton_${id}`;
  };
}

// UserListDropdownItem Extensible Area

export interface UserListDropdownItem extends PluginProvidedUiItemDescriptor{
  userId: string;
}
interface UserListDropdownOptionProps {
  label: string;
  icon: string;
  tooltip: string;
  allowed: boolean;
  userId: string;
  onClick: () => void;
}

export class UserListDropdownOption implements UserListDropdownItem {
  id: string = '';

  userId: string;

  type: UserListDropdownItemType;

  label: string;

  icon: string;

  tooltip: string;

  allowed: boolean;

  onClick: () => void;

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

interface UserListDropdownSeparatorProps {
  userId: string;
}

export class UserListDropdownSeparator implements UserListDropdownItem {
  id: string = '';

  userId: string;

  type: UserListDropdownItemType;

  constructor({ userId = '' }: UserListDropdownSeparatorProps) {
    this.userId = userId;
    this.type = UserListDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserListDropdownSeparator_${id}`;
  };
}

// ActionBarItem Extensible Area

export interface ActionBarItem extends PluginProvidedUiItemDescriptor{
  position: ActionBarPosition;
}

export interface ActionBarButtonDropdownItem {
  label: string;
  icon: string;
  tooltip: string;
  allowed: boolean;
  userId: string;
  onClick: () => void;
}

interface ActionBarButtonProps {
  icon: string;
  tooltip: string;
  allowed: boolean;
  hasDropdownButton: boolean;
  listOfDropdownItems: ActionBarButtonDropdownItem[];
  position: ActionBarPosition;
  onClick: () => void;
}

export class ActionBarButton implements ActionBarItem {
  id: string = '';

  type: ActionBarItemType;

  icon: string;

  tooltip: string;

  allowed: boolean;

  hasDropdownButton: boolean;

  listOfDropdownItems: ActionBarButtonDropdownItem[];

  position: ActionBarPosition;

  onClick: () => void;

  constructor({
    icon = '', tooltip = '', allowed = true, onClick = () => {},
    hasDropdownButton = false, listOfDropdownItems = [], position = ActionBarPosition.RIGHT,
  }: ActionBarButtonProps) {
    this.icon = icon;
    this.tooltip = tooltip;
    this.allowed = allowed;
    this.onClick = onClick;
    this.hasDropdownButton = hasDropdownButton;
    this.listOfDropdownItems = listOfDropdownItems;
    this.position = position;
    this.type = ActionBarItemType.BUTTON;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `ActionBarButton_${id}`;
  };
}

export interface ActionBarSeparatorProps {
  position: ActionBarPosition;
}

export class ActionBarSeparator implements ActionBarItem {
  position: ActionBarPosition;

  id: string = '';

  type: ActionBarItemType;

  constructor({
    position = ActionBarPosition.RIGHT,
  }: ActionBarSeparatorProps) {
    this.position = position;
    this.type = ActionBarItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `ActionBarSeparator_${id}`;
  };
}

// Setter Functions for the API
export type SetPresentationToolbarItems = (presentationToolbarItem:
  PresentationToolbarItem[]) => void;

export type SetUserListDropdownItems = (
  userListDropdownItem: UserListDropdownItem[]
) => void;

export type SetActionBarItems = (
  actionBarItems: ActionBarItem[]
) => void;

export interface PluginApi {
  setPresentationToolbarItems: SetPresentationToolbarItems;
  setUserListDropdownItems: SetUserListDropdownItems;
  setActionBarItems: SetActionBarItems;
}

export interface PluginBrowserWindow extends Window {
  bbb_plugins: { [key: string]: PluginApi};
}
