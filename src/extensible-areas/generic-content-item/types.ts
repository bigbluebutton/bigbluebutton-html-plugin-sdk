import { PluginProvidedUiItemDescriptor } from '../base';

export interface GenericContentInterface extends PluginProvidedUiItemDescriptor {
}

export interface GenericContentMainAreaProps {
  contentFunction: (element: HTMLElement) => void;
}

export interface GenericContentSidekickAreaProps {
  contentFunction: (element: HTMLElement) => void;
  name: string;
  section: string;
  buttonIcon: string;
}

export type SetGenericContents = (
  GenericContents: GenericContentInterface[]
) => void;
