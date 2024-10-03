import * as ReactDOM from 'react-dom/client';
import { PluginProvidedUiItemDescriptor } from '../base';

export interface GenericContentInterface extends PluginProvidedUiItemDescriptor {
}

export interface GenericContentMainAreaProps {
  contentFunction: (element: HTMLElement) => ReactDOM.Root;
}

export interface GenericContentSidekickAreaProps {
  contentFunction: (element: HTMLElement) => ReactDOM.Root;
  name: string;
  section: string;
  buttonIcon: string;
  open: boolean;
}
