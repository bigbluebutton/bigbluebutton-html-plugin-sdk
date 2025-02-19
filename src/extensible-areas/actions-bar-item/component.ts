import { ChangeEvent, MouseEvent } from 'react';
import { ActionsBarPosition, ActionsBarItemType } from './enums';
import {
  ActionsBarInterface,
  ActionsBarItemProps,
  ActionsBarButtonProps,
  ActionsBarSeparatorProps,
  ActionsBarSelectorProps,
  SelectOption,
  ToggleGroupOption,
  ActionsBarToggleGroupProps,
} from './types';

// ActionsBar Extensible Area

class ActionsBarItem implements ActionsBarInterface {
  id: string = '';

  type: ActionsBarItemType;

  position: ActionsBarPosition;

  constructor({
    id, type, position = ActionsBarPosition.RIGHT,
  }: ActionsBarItemProps) {
    if (id) {
      this.id = id;
    }
    this.type = type;
    this.position = position;
  }

  setItemId(id: string):void {
    this.id = `ActionsBar${this.type}_${id}`;
  }
}

export class ActionsBarButton extends ActionsBarItem {
  icon: string;

  tooltip: string;

  onClick: () => void;

  /**
   * Returns object to be used in the setter for action bar. In this case,
   * a button.
   *
   * @param icon - icon to be used in the button for the action bar
   * @param tooltip - tooltip to be displayed when hovering the button
   * @param onClick - function to be called when clicking the button
   * @param position - position that this button will be displayed, see {@link ActionsBarPosition}
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5)
   */
  constructor({
    id, icon = '', tooltip = '', onClick = () => {}, position = ActionsBarPosition.RIGHT,
  }: ActionsBarButtonProps) {
    super({ id, type: ActionsBarItemType.BUTTON, position });
    this.icon = icon;
    this.tooltip = tooltip;
    this.onClick = onClick;
  }
}

export class ActionsBarSeparator extends ActionsBarItem {
  icon: string;

  /**
   * Returns object to be used in the setter for action bar. In this case,
   * a separator.
   *
   * @param position - position that this button will be displayed, see {@link ActionsBarPosition}
   * @param icon - Icon to be displayed as the separator. If not provided, the default separator
  * (a vertical bar) will be displayed.
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5)
   */
  constructor({
    position = ActionsBarPosition.RIGHT,
    icon = '',
  }: ActionsBarSeparatorProps) {
    super({ type: ActionsBarItemType.SEPARATOR, position });
    this.icon = icon;
  }
}

export class ActionsBarSelector extends ActionsBarItem {
  title: string;

  options: SelectOption[];

  defaultOption: SelectOption;

  onChange: (value: string | number, event: ChangeEvent<HTMLInputElement>) => void;

  width: number = 145;

  /**
   * Returns object to be used in the setter for action bar. In this case,
   * a selector.
   *
   * @param title - title to be used in the selector for the actions bar
   * @param options - an array of options to be available in the selector
   * @param defaultOption - the option to be initially selected, if not present, the first option is
   * selected
   * @param onChange - function to be called when selected value changes
   * @param position - position that this button will be displayed, see {@link ActionsBarPosition}
   * @param width - desired width for the selector in px, default is 140
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5)
   */

  constructor({
    id,
    title = '',
    options = [],
    defaultOption = options[0],
    onChange = () => {},
    position = ActionsBarPosition.RIGHT,
    width = 140,
  }: ActionsBarSelectorProps) {
    super({ id, type: ActionsBarItemType.SELECTOR, position });
    this.title = title;
    this.options = options;
    this.defaultOption = defaultOption;
    this.onChange = onChange;
    this.width = width;
  }
}

export class ActionsBarToggleGroup extends ActionsBarItem {
  title: string;

  exclusive: boolean;

  options: ToggleGroupOption[];

  defaultOption: ToggleGroupOption;

  onChange: (values: string | number | string[] | number[], event: MouseEvent<HTMLElement>) => void;

  /**
   * Returns object to be used in the setter for action bar. In this case,
   * a toggle group.
   *
   * @param title - title to be used in the selector for the actions bar
   * @param exclusive - whether the toggle group should be exclusive or not - allow checking
   * multiple options
   * @param options - an array of options to be available in the toggle group
   * @param defaultOption - the option to be initially checked, if not present, the first option is
   * checked
   * @param onChange - function to be called when checked value changes
   * @param position - position that this button will be displayed, see {@link ActionsBarPosition}
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5)
   */

  constructor({
    id,
    title = '',
    exclusive = true,
    options = [],
    defaultOption = options[0],
    onChange = () => {},
    position = ActionsBarPosition.RIGHT,
  }: ActionsBarToggleGroupProps) {
    super({ id, type: ActionsBarItemType.TOGGLE_GROUP, position });
    this.title = title;
    this.exclusive = exclusive;
    this.options = options;
    this.defaultOption = defaultOption;
    this.onChange = onChange;
  }
}
