import { PluginProvidedUiItemDescriptor } from '../base';

export interface GenericComponentInterface extends PluginProvidedUiItemDescriptor {
}

export interface GenericComponentMainContentProps {
  contentFunction: (element: HTMLElement) => void;
}

export interface GenericComponentSidekickContentProps {
  contentFunction: (element: HTMLElement) => void;
  menuItemTitle: string;
  menuItemContentMessage: string;
  menuItemIcon: string;
  open: boolean;
}

export type SetGenericComponents = (
  GenericComponents: GenericComponentInterface[]
) => void;
