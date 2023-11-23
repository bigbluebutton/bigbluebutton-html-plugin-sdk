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

  /**
   * Returns object to be used in the setter for the Options Dropdown. In this case,
   * an option (Similar to a button, the user can click it).
   *
   * @param label - label to be displayed in the options dropdown option.
   * @param icon - icon to be displayed in the options dropdown. It goes in the left side of it.
   * @param onClick - function to be called when clicking the option.
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5).
   */
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

  /**
   * Returns object to be used in the setter for the Navigation Bar. In this case,
   * a separator.
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5).
   */
  constructor() {
    this.type = OptionsDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `OptionsDropdownSeparator_${id}`;
  };
}
