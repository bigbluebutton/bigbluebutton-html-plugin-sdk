import { PluginProvidedUiItemDescriptor } from '../base';

export interface FloatingWindowInterface extends PluginProvidedUiItemDescriptor {
}

export interface FloatingWindowProps {
  top: number;
  left: number;
  movable: boolean;
  backgroundColor: string;
  boxShadow: string;
  contentFunction: (element: HTMLElement) => void;
}

export type SetFloatingWindows = (
  FloatingWindows: FloatingWindowInterface[]
) => void;
