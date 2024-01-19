import { PresentationDropdownItemType } from './enums';
import {
  PresentationDropdownInterface, PresentationDropdownOptionProps,
} from './types';

// PresentationDropdown Extensible Area

export class PresentationDropdownOption implements PresentationDropdownInterface {
  id: string = '';

  type: PresentationDropdownItemType;

  label: string;

  icon: string;

  onClick: () => void;

  /**
   * Returns object to be used in the setter for the Presentation Dropdown. In this case,
   * an option (clickable).
   *
   * @param label - label to be displayed in the presentation dropdown option.
   * @param icon - icon to be displayed in the presentation dropdown.
   * It goes in the left side of it.
   * @param onClick - function to be called when clicking the option.
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5).
   */
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

export class PresentationDropdownSeparator implements PresentationDropdownInterface {
  id: string = '';

  type: PresentationDropdownItemType;

  /**
   * Returns object to be used in the setter for the Presentation Dropdown. In this case,
   * a separator (horizontal thin black line).

   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5).
   */
  constructor() {
    this.type = PresentationDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `PresentationDropdownSeparator_${id}`;
  };
}
