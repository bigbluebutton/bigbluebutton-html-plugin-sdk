import { PresentationDropdownItemType } from './enums';
import {
  PresentationDropdownItem, PresentationDropdownOptionProps,
} from './types';

// PresentationDropdownItem Extensible Area

export class PresentationDropdownOption implements PresentationDropdownItem {
  id: string = '';

  type: PresentationDropdownItemType;

  label: string;

  icon: string;

  onClick: () => void;

  constructor({
    label = '', icon = '', onClick = () => {},
  }: PresentationDropdownOptionProps) {
    this.label = label;
    this.icon = icon;
    this.onClick = onClick;
    this.type = PresentationDropdownItemType.OPTION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `PresentationDropdownOption_${id}`;
  };
}

export class PresentationDropdownSeparator implements PresentationDropdownItem {
  id: string = '';

  type: PresentationDropdownItemType;

  constructor() {
    this.type = PresentationDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `PresentationDropdownSeparator_${id}`;
  };
}
