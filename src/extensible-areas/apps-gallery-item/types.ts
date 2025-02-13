import { PluginProvidedUiItemDescriptor } from '../base';
import { AppsGalleryType } from './enums';

export interface AppsGalleryInterface extends PluginProvidedUiItemDescriptor {
  type: AppsGalleryType;
}

export interface AppsGalleryItemProps {
  id?: string;
  name: string;
  icon: string;
  onClick: () => void;
}
