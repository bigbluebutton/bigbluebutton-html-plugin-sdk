import { PluginProvidedUiItemDescriptor } from '../base';

export interface GenericContentInterface extends PluginProvidedUiItemDescriptor {
}

export interface GenericContentProps {
  contentFunction: (element: HTMLElement) => void;
}

export type SetGenericContents = (
  GenericContents: GenericContentInterface[]
) => void;
