import * as ReactDOM from 'react-dom/client';
import { PluginProvidedUiItemDescriptor } from '../base';

export interface FloatingWindowInterface extends PluginProvidedUiItemDescriptor {
}

export interface FloatingWindowProps {
  id?: string;
  top: number;
  left: number;
  movable: boolean;
  backgroundColor: string;
  boxShadow: string;
  contentFunction: (element: HTMLElement) => ReactDOM.Root;
}

export type SetFloatingWindows = (
  FloatingWindows: FloatingWindowInterface[]
) => void;
