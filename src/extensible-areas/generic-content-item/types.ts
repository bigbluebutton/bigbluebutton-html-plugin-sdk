import { PluginProvidedUiItemDescriptor } from '../base';

export interface GenericContentInterface extends PluginProvidedUiItemDescriptor {
}

export interface GenericMainContentProps {
  contentFunction: (element: HTMLElement) => void;
}

export interface GenericSidekickContentProps {
  contentFunction: (element: HTMLElement) => void;
  name: string;
  section: string;
  buttonIcon: string;
}

export type SetGenericContents = (
  GenericContents: GenericContentInterface[]
) => void;
