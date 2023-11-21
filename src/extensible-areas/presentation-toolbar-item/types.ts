import { PluginProvidedUiItemDescriptor } from '../base';

export interface PresentationToolbarItem extends PluginProvidedUiItemDescriptor {}

export interface PresentationToolbarButtonProps {
  label: string;
  tooltip: string;
  onClick: () => void;
}

export interface PresentationToolbarSeparatorProps {
  width: number;
}
