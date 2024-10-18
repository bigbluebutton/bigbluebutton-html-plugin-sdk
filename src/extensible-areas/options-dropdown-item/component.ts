import { OptionsDropdownItemType } from './enums';
import {
  OptionsDropdownInterface, OptionsDropdownOptionProps,
} from './types';

// OptionsDropdown Extensible Area

export class OptionsDropdownOption implements OptionsDropdownInterface {
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
    id, label = '', icon = '', onClick = () => {},
  }: OptionsDropdownOptionProps) {
    if (id) {
      this.id = id;
    }
    this.label = label;
    this.icon = icon;
    this.onClick = onClick;
    this.type = OptionsDropdownItemType.OPTION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `OptionsDropdownOption_${id}`;
  };
}

export class OptionsDropdownSeparator implements OptionsDropdownInterface {
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
