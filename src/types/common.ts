import { UserListDropdownItemType, WhiteboardToolbarItemType } from '../index';

export interface PluginProvidedUiItemDescriptor {
  id: string
  type: string
  setItemId: (id: string) => void
}

export interface CustomEventHook<T> {
  data: T
  hook: string
}

export interface CustomEventHookWrapper<T> extends Event {
  detail: CustomEventHook<T>
}

// Extensible Areas

// WhiteboardToolbarItem Extensible Area

export interface WhiteboardToolbarItem extends PluginProvidedUiItemDescriptor{}

export interface WhiteboardToolbarButtonProps {
  label: string,
  tooltip: string,
  onClick: () => void,
}

export class WhiteboardToolbarButton implements WhiteboardToolbarItem {
  id: string = '';

  type: string;

  label: string;

  tooltip: string;

  onClick: () => void;

  constructor({ label = '', tooltip = '', onClick = () => {} }: WhiteboardToolbarButtonProps) {
    this.label = label;
    this.tooltip = tooltip;
    this.onClick = onClick;
    this.type = WhiteboardToolbarItemType.BUTTON;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `WhiteboardToolbarButton_${id}`;
  };
}

export class WhiteboardToolbarSpinner implements WhiteboardToolbarItem {
  id: string = '';

  type: string;

  constructor() {
    this.type = WhiteboardToolbarItemType.SPINNER;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `WhiteboardToolbarButton_${id}`;
  };
}

export interface WhiteboardToolbarSeparatorProps {
  width: number
}
export class WhiteboardToolbarSeparator implements WhiteboardToolbarItem {
  id: string = '';

  type: string;

  width: number;

  constructor({ width } : WhiteboardToolbarSeparatorProps) {
    this.width = width;
    this.type = WhiteboardToolbarItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `WhiteboardToolbarButton_${id}`;
  };
}

// UserListDropdownItem Extensible Area

export interface UserListDropdownItem extends PluginProvidedUiItemDescriptor{
  label: string,
  icon: string,
  tooltip: string,
  allowed: boolean,
}

export interface UserListDropdownItemWrapper {
  userId: string
  userListDropdownItem: UserListDropdownItem,
}

export interface UserListDropdownInformationProps {
  label: string,
  icon: string,
  tooltip: string,
  allowed: boolean,
}

export class UserListDropdownInformation implements UserListDropdownItem {
  id: string = '';

  type: string;

  label: string;

  icon: string;

  tooltip: string;

  allowed: boolean;

  constructor({
    label = '', icon = '', tooltip = '', allowed = true,
  }: UserListDropdownInformationProps) {
    this.label = label;
    this.tooltip = tooltip;
    this.icon = icon;
    this.allowed = allowed;
    this.type = UserListDropdownItemType.INFORMATION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserListDropdownInformation_${id}`;
  };
}

interface UserListDropdownButtonProps {
  label: string,
  icon: string,
  tooltip: string,
  allowed: boolean,
  onClick: () => void,
}

export class UserListDropdownButton implements UserListDropdownItem {
  id: string = '';

  type: string;

  label: string;

  icon: string;

  tooltip: string;

  allowed: boolean;

  onClick: () => void;

  constructor({
    label = '', icon = '', tooltip = '', allowed = true, onClick = () => {},
  }: UserListDropdownButtonProps) {
    this.label = label;
    this.icon = icon;
    this.tooltip = tooltip;
    this.allowed = allowed;
    this.onClick = onClick;
    this.type = UserListDropdownItemType.BUTTON;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserListDropdownButton_${id}`;
  };
}

export interface UserListDropdownDropdownItem {
  label: string,
  icon: string,
  tooltip: string,
  onClick: () => void
}

export interface UserListDropdownDropdownProps {
  label: string,
  icon: string,
  tooltip: string,
  type: string,
  onClick: () => void,
  allowed: boolean,
  itemsList: UserListDropdownDropdownItem[]
}

export class UserListDropdownDropdown implements UserListDropdownItem {
  id: string = '';

  type: string;

  label: string;

  icon: string;

  tooltip: string;

  allowed: boolean;

  onClick: () => void;

  itemsList: UserListDropdownDropdownItem[];

  constructor({
    label = '', icon = '', tooltip = '', allowed = true, onClick = () => {},
    itemsList = new Array<UserListDropdownDropdownItem>(),
  }: UserListDropdownDropdownProps) {
    this.label = label;
    this.icon = icon;
    this.tooltip = tooltip;
    this.allowed = allowed;
    this.onClick = onClick;
    this.itemsList = itemsList;
    this.type = UserListDropdownItemType.DROPDOWN;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserListDropdownDropdown_${id}`;
  };
}

// Setter Functions for the API

export type SetWhiteboardToolbarItems = (whiteboardToolbarItem: WhiteboardToolbarItem[]) => void;
export type SetUserListDropdownItems = (
  userListDropdownItemWrapper: UserListDropdownItemWrapper[]
) => void;

export interface PluginApi {
  setWhiteboardToolbarItems: SetWhiteboardToolbarItems
  setUserListDropdownItems: SetUserListDropdownItems
}

export interface PluginBrowserWindow extends Window {
  bbb_plugins: { [key: string]: PluginApi};
}
