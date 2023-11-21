import { OptionsDropdownItemType } from './enums';
import {
  OptionsDropdownItem, OptionsDropdownOptionProps,
} from './types';

// OptionsDropdownItem Extensible Area

export class OptionsDropdownOption implements OptionsDropdownItem {
  id: string = '';

  type: OptionsDropdownItemType;

  label: string;

  icon: string;

  onClick: () => void;

  constructor({
    label = '', icon = '', onClick = () => {},
  }: OptionsDropdownOptionProps) {
    this.label = label;
    this.icon = icon;
    this.onClick = onClick;
    this.type = OptionsDropdownItemType.OPTION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `OptionsDropdownOption_${id}`;
  };
}

export class OptionsDropdownSeparator implements OptionsDropdownItem {
  id: string = '';

  type: OptionsDropdownItemType;

  constructor() {
    this.type = OptionsDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `OptionsDropdownSeparator_${id}`;
  };
}
