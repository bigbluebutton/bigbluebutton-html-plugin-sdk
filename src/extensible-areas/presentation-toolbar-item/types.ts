import { PluginProvidedUiItemDescriptor } from '../base';

/**
 * Interface for a generic item for presentation toolbar.
 */
export interface PresentationToolbarItem extends PluginProvidedUiItemDescriptor {}

export interface PresentationToolbarButtonProps {
  label: string;
  tooltip: string;
  onClick: () => void;
}
