import {
  PresentationToolbarItemType,
  UserListDropdownItemType,
  ActionButtonDropdownItemType,
  ActionsBarItemType,
  ActionsBarPosition,
  AudioSettingsDropdownItemType,
  PresentationDropdownItemType,
  NavBarItemType,
  NavBarItemPosition,
  OptionsDropdownItemType,
} from '../index';

type PluginProvidedUiItemType = UserListDropdownItemType |
  PresentationToolbarItemType | ActionButtonDropdownItemType |
  ActionsBarItemType | AudioSettingsDropdownItemType |
  PresentationDropdownItemType | NavBarItemType | OptionsDropdownItemType;

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

// ActionButtonDropdownItem Extensible Area

export interface ActionButtonDropdownItem extends PluginProvidedUiItemDescriptor{
}
interface ActionButtonDropdownOptionProps {
  label: string;
  icon: string;
  tooltip: string;
  allowed: boolean;
  onClick: () => void;
}

export class ActionButtonDropdownOption implements ActionButtonDropdownItem {
  id: string = '';

  type: ActionButtonDropdownItemType;

  label: string;

  icon: string;

  tooltip: string;

  allowed: boolean;

  onClick: () => void;

  constructor({
    label = '', icon = '', tooltip = '', allowed = true, onClick = () => {},
  }: ActionButtonDropdownOptionProps) {
    this.label = label;
    this.icon = icon;
    this.tooltip = tooltip;
    this.allowed = allowed;
    this.onClick = onClick;
    this.type = ActionButtonDropdownItemType.OPTION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `ActionButtonDropdownOption_${id}`;
  };
}

export class ActionButtonDropdownSeparator implements ActionButtonDropdownItem {
  id: string = '';

  type: ActionButtonDropdownItemType;

  constructor() {
    this.type = ActionButtonDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `ActionButtonDropdownSeparator_${id}`;
  };
}

// ActionsBarItem Extensible Area

export interface ActionsBarItem extends PluginProvidedUiItemDescriptor{
  position: ActionsBarPosition;
}

export interface ActionsBarButtonDropdownItem {
  label: string;
  icon: string;
  tooltip: string;
  allowed: boolean;
  userId: string;
  onClick: () => void;
}

interface ActionsBarButtonProps {
  icon: string;
  tooltip: string;
  allowed: boolean;
  hasDropdownButton: boolean;
  listOfDropdownItems: ActionsBarButtonDropdownItem[];
  position: ActionsBarPosition;
  onClick: () => void;
}

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

export interface ActionsBarSeparatorProps {
  position: ActionsBarPosition;
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

// AudioSettingsDropdownItem Extensible Area

export interface AudioSettingsDropdownItem extends PluginProvidedUiItemDescriptor{
}
interface AudioSettingsDropdownOptionProps {
  label: string;
  icon: string;
  onClick: () => void;
}

export class AudioSettingsDropdownOption implements AudioSettingsDropdownItem {
  id: string = '';

  type: AudioSettingsDropdownItemType;

  label: string;

  icon: string;

  onClick: () => void;

  constructor({
    label = '', icon = '', onClick = () => {},
  }: AudioSettingsDropdownOptionProps) {
    this.label = label;
    this.icon = icon;
    this.onClick = onClick;
    this.type = AudioSettingsDropdownItemType.OPTION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `AudioSettingsDropdownOption_${id}`;
  };
}

export class AudioSettingsDropdownSeparator implements AudioSettingsDropdownItem {
  id: string = '';

  type: AudioSettingsDropdownItemType;

  constructor() {
    this.type = AudioSettingsDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `AudioSettingsDropdownSeparator_${id}`;
  };
}

// PresentationDropdownItem Extensible Area

export interface PresentationDropdownItem extends PluginProvidedUiItemDescriptor{
}
interface PresentationDropdownOptionProps {
  label: string;
  icon: string;
  onClick: () => void;
}

export class PresentationDropdownOption implements PresentationDropdownItem {
  id: string = '';

  type: PresentationDropdownItemType;

  label: string;

  icon: string;

  onClick: () => void;

  constructor({
    label = '', icon = '', onClick = () => {},
  }: PresentationDropdownOptionProps) {
    this.label = label;
    this.icon = icon;
    this.onClick = onClick;
    this.type = PresentationDropdownItemType.OPTION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `PresentationDropdownOption_${id}`;
  };
}

export class PresentationDropdownSeparator implements PresentationDropdownItem {
  id: string = '';

  type: PresentationDropdownItemType;

  constructor() {
    this.type = PresentationDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `PresentationDropdownSeparator_${id}`;
  };
}

// NavBarItem Extensible Area

export interface NavBarItem extends PluginProvidedUiItemDescriptor{
  position: NavBarItemPosition;
  hasSeparator: boolean;
}
interface NavBarButtonProps {
  label: string;
  icon: string;
  tooltip: string;
  disabled: boolean;
  hasSeparator: boolean;
  position: NavBarItemPosition;
  onClick: () => void;
}

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

interface NavBarInfoProps {
  label: string;
  hasSeparator: boolean;
  icon: string;
  disabled: boolean;
  position: NavBarItemPosition;
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

// OptionsDropdownItem Extensible Area

export interface OptionsDropdownItem extends PluginProvidedUiItemDescriptor{
}

interface OptionsDropdownOptionProps {
  label: string;
  icon: string;
  onClick: () => void;
}

export class OptionsDropdownOption implements OptionsDropdownItem {
  id: string = '';

  type: OptionsDropdownItemType;

  label: string;

  icon: string;

  onClick: () => void;

  constructor({
    label = '', icon = '', onClick = () => {},
  }: OptionsDropdownOptionProps) {
    this.label = label;
    this.icon = icon;
    this.onClick = onClick;
    this.type = OptionsDropdownItemType.OPTION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `OptionsDropdownOption_${id}`;
  };
}

export class OptionsDropdownSeparator implements OptionsDropdownItem {
  id: string = '';

  type: OptionsDropdownItemType;

  constructor() {
    this.type = OptionsDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `OptionsDropdownSeparator_${id}`;
  };
}

// Setter Functions for the API
export type SetPresentationToolbarItems = (presentationToolbarItem:
  PresentationToolbarItem[]) => void;

export type SetUserListDropdownItems = (
  userListDropdownItem: UserListDropdownItem[]
) => void;

export type SetActionButtonDropdownItems = (
  actionButtonDropdownItem: ActionButtonDropdownItem[]
) => void;

export type SetActionsBarItems = (
  actionsBarItems: ActionsBarItem[]
) => void;

export type SetAudioSettingsDropdownItems = (
  audioSettingsDropdownItem: AudioSettingsDropdownItem[]
) => void;

export type SetPresentationDropdownItems = (
  userListDropdownItem: PresentationDropdownItem[]
) => void;

export type SetNavBarItems = (
  userListDropdownItem: NavBarItem[]
) => void;

export type SetOptionsDropdownItems = (
  optionsDropdownItem: OptionsDropdownItem[]
) => void;

export interface PluginApi {
  setPresentationToolbarItems: SetPresentationToolbarItems;
  setUserListDropdownItems: SetUserListDropdownItems;
  setActionButtonDropdownItems: SetActionButtonDropdownItems;
  setActionsBarItems: SetActionsBarItems;
  setAudioSettingsDropdownItems: SetAudioSettingsDropdownItems;
  setPresentationDropdownItems: SetPresentationDropdownItems;
  setNavBarItems: SetNavBarItems;
  setOptionsDropdownItems: SetOptionsDropdownItems;
}

export interface PluginBrowserWindow extends Window {
  bbb_plugins: { [key: string]: PluginApi};
}
