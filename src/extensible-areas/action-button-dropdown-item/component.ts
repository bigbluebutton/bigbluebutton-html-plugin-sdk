import { ActionButtonDropdownItemType } from './enums';
import {
  ActionButtonDropdownInterface, ActionButtonDropdownOptionProps,
} from './types';

// ActionButtonDropdown Extensible Area

export class ActionButtonDropdownOption implements ActionButtonDropdownInterface {
  id: string = '';

  type: ActionButtonDropdownItemType;

  label: string;

  icon: string;

  tooltip: string;

  dataTest: string;

  allowed: boolean;

  onClick: () => void;

  /**
   * Returns the option for the action button dropdown
   *
   * @param label - label to be displayed on the option
   * @param icon - icon to be displayed on the option
   * @param tooltip - tooltip to be displayed when hovering over option
   * @param dataTest - string attribute to be used for testing
   * @param allowed - boolean indicating whether the option should be displayed
   * @param onClick - function to be called when clicking
   *
   * @returns the option to be displayed in the action button dropdown
   */
  constructor({
    id, label = '', icon = '', tooltip = '', dataTest = '', allowed = true, onClick = () => {},
  }: ActionButtonDropdownOptionProps) {
    if (id) {
      this.id = id;
    }
    this.label = label;
    this.icon = icon;
    this.tooltip = tooltip;
    this.dataTest = dataTest;
    this.allowed = allowed;
    this.onClick = onClick;
    this.type = ActionButtonDropdownItemType.OPTION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `ActionButtonDropdownOption_${id}`;
  };
}

export class ActionButtonDropdownSeparator implements ActionButtonDropdownInterface {
  id: string = '';

  type: ActionButtonDropdownItemType;

  constructor() {
    this.type = ActionButtonDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `ActionButtonDropdownSeparator_${id}`;
  };
}
