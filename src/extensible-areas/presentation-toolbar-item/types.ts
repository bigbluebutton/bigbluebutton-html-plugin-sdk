import { PluginProvidedUiItemDescriptor } from '../base';

/**
 * Interface for a generic item for presentation toolbar.
 */
export interface PresentationToolbarInterface extends PluginProvidedUiItemDescriptor {}

export interface PresentationToolbarButtonProps {
  id?: string;
  label: string;
  tooltip: string;
  style: React.CSSProperties;
  onClick: () => void;
}
