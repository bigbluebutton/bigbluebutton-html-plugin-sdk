import { PluginProvidedUiItemDescriptor } from '../base';

export interface GenericComponentInterface extends PluginProvidedUiItemDescriptor {
}

export interface GenericComponentProps {
  contentFunction: (element: HTMLElement) => void;
}

export type SetGenericComponents = (
  GenericComponents: GenericComponentInterface[]
) => void;
