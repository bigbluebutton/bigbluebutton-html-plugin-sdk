import {
  PresentationToolbarItemType,
  UserListDropdownItemType,
} from '../index';

type PluginProvidedUiItemType = UserListDropdownItemType | PresentationToolbarItemType;

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

export interface UserListDropdownItem extends PluginProvidedUiItemDescriptor{}

export interface UserListDropdownItemWrapper {
  userId: string;
  userListDropdownItem: UserListDropdownItem;
}

interface UserListDropdownOptionProps {
  label: string;
  icon: string;
  tooltip: string;
  allowed: boolean;
  onClick: () => void;
}

export class UserListDropdownOption implements UserListDropdownItem {
  id: string = '';

  type: UserListDropdownItemType;

  label: string;

  icon: string;

  tooltip: string;

  allowed: boolean;

  onClick: () => void;

  constructor({
    label = '', icon = '', tooltip = '', allowed = true, onClick = () => {},
  }: UserListDropdownOptionProps) {
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
export class UserListDropdownSeparator implements UserListDropdownItem {
  id: string = '';

  type: UserListDropdownItemType;

  constructor() {
    this.type = UserListDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserListDropdownSeparator_${id}`;
  };
}

// Setter Functions for the API
export type SetPresentationToolbarItems = (presentationToolbarItem:
  PresentationToolbarItem[]) => void;

export type SetUserListDropdownItemWrappers = (
  userListDropdownItemWrapper: UserListDropdownItemWrapper[]
) => void;

export interface PluginApi {
  setPresentationToolbarItems: SetPresentationToolbarItems;
  setUserListDropdownItemWrappers: SetUserListDropdownItemWrappers;
}

export interface PluginBrowserWindow extends Window {
  bbb_plugins: { [key: string]: PluginApi};
}
