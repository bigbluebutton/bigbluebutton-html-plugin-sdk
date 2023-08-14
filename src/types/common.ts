import { PresentationToolbarItemType } from '../index';

export interface PluginProvidedUiItemDescriptor {
  id: string
  type: string
  setItemId: (id: string) => void
}

export interface PresentationToolbarItem extends PluginProvidedUiItemDescriptor{}

export interface PresentationToolbarButtonProps {
  label: string,
  tooltip: string,
  onClick: () => void,
}

export class PresentationToolbarButton implements PresentationToolbarItem {
  id: string = '';

  type: string;

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

  type: string;

  constructor() {
    this.type = PresentationToolbarItemType.SPINNER;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `PresentationToolbarButton_${id}`;
  };
}

export interface PresentationToolbarSeparatorProps {
  width: number
}
export class PresentationToolbarSeparator implements PresentationToolbarItem {
  id: string = '';

  type: string;

  width: number;

  constructor({ width } : PresentationToolbarSeparatorProps) {
    this.width = width;
    this.type = PresentationToolbarItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `PresentationToolbarButton_${id}`;
  };
}

export type SetPresentationToolbarItems = (presentationToolbarItem:
  PresentationToolbarItem[]) => void;

export interface PluginApi {
  setPresentationToolbarItems: SetPresentationToolbarItems
}

export interface PluginBrowserWindow extends Window {
  bbb_plugins: { [key: string]: PluginApi};
}

export interface CustomEventHook<T> {
  data: T
  hook: string
}

export interface CustomEventHookWrapper<T> extends Event {
  detail: CustomEventHook<T>
}
