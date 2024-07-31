import { ScreenshareHelperItemType, ScreenshareHelperItemPosition } from './enums';
import {
  ScreenshareHelperButtonProps,
  ScreenshareHelperButtonInterface,
} from './types';

// ScreenshareHelper Extensible Area

export class ScreenshareHelperButton implements ScreenshareHelperButtonInterface {
  id: string = '';

  type: ScreenshareHelperItemType;

  label: string;

  icon: string;

  tooltip: string;

  disabled: boolean;

  position: ScreenshareHelperItemPosition;

  onClick: () => void;

  /**
   * Returns object to be used in the setter for the Screenshare Helper. In this case,
   * a button.
   *
   * @param label - label to be displayed in screenshare helper button (Not mandatory).
   * @param tooltip - label to be displayed when hovering the screenshare helper button.
   * @param icon - icon to be used in the screenshare helper button. It goes in the left side of it.
   * @param onClick - function to be called when clicking the button.
   * @param position - position to place the screenshare helper button.
   * See {@link ScreenshareHelperItemPosition}
   * @param hasSeparator - boolean indicating whether the screenshare helper button has separator
   * (vertical bar)
   * @param disabled - if true, the screenshare helper button will not be clickable
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5).
   */
  constructor({
    label = '', icon = '', tooltip = '', disabled = true, onClick = () => {},
    position = ScreenshareHelperItemPosition.TOP_RIGHT,
  }: ScreenshareHelperButtonProps) {
    this.label = label;
    this.icon = icon;
    this.tooltip = tooltip;
    this.disabled = disabled;
    this.onClick = onClick;
    this.type = ScreenshareHelperItemType.BUTTON;
    this.position = position;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `ScreenshareHelperButton_${id}`;
  };
}
