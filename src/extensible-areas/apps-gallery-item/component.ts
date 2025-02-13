import { AppsGalleryType } from './enums';
import { AppsGalleryInterface, AppsGalleryItemProps } from './types';

export class AppsGalleryEntry implements AppsGalleryInterface {
  id: string = '';

  name: string = '';

  type: AppsGalleryType = AppsGalleryType.ENTRY;

  icon: string = '';

  onClick: () => void;

  constructor({
    id,
    name,
    icon,
    onClick,
  }: AppsGalleryItemProps) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.icon = icon;
    this.onClick = onClick;
  }

  setItemId(id: string): void {
    this.id = id;
  }
}

export default AppsGalleryEntry;
