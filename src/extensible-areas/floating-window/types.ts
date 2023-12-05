import { PluginProvidedUiItemDescriptor } from '../base';

export interface FloatingWindowItem extends PluginProvidedUiItemDescriptor {
}

export interface FloatingWindowProps {
  top: number;
  left: number;
  movable: boolean;
  backgroundColor: string;
  boxShadow: string;
  contentFunction: (element: HTMLElement) => void;
}

export type SetFloatingWindowItems = (
  FloatingWindowItems: FloatingWindowItem[]
) => void;
