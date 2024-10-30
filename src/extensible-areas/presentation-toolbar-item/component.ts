import { PresentationToolbarItemType } from './enums';
import {
  PresentationToolbarInterface, PresentationToolbarButtonProps,
} from './types';

// PresentationToolbar Extensible Area

export class PresentationToolbarButton implements PresentationToolbarInterface {
  id: string = '';

  type: PresentationToolbarItemType;

  label: string;

  tooltip: string;

  style: React.CSSProperties;

  onClick: () => void;

  /**
   * Returns object to be used in the setter for presentation toolbar. In this case
   * a button.
   *
   * @param label - label to be displayed in the button
   * @param tooltip - tooltip to be displayed when hovering the button
   * @param onClick - function to be called when clicking the button
   * @param style - style of the button in the presentation toolbar
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5)
   */
  constructor({
    id, label = '', tooltip = '', onClick = () => {}, style = {},
  }: PresentationToolbarButtonProps) {
    if (id) {
      this.id = id;
    }
    this.label = label;
    this.tooltip = tooltip;
    this.onClick = onClick;
    this.style = style;
    this.type = PresentationToolbarItemType.BUTTON;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `PresentationToolbarButton_${id}`;
  };
}

export class PresentationToolbarSpinner implements PresentationToolbarInterface {
  id: string = '';

  type: PresentationToolbarItemType;

  /**
   * Returns object to be used in the setter for presentation toolbar. In this case
   * a spinner (ring that will be rotating).
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5)
   */
  constructor() {
    this.type = PresentationToolbarItemType.SPINNER;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `PresentationToolbarSpinner_${id}`;
  };
}

export class PresentationToolbarSeparator implements PresentationToolbarInterface {
  id: string = '';

  type: PresentationToolbarItemType;

  /**
   * Returns object to be used in the setter for presentation toolbar. In this case
   * a separator.
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5)
   */
  constructor() {
    this.type = PresentationToolbarItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `PresentationToolbarSeparator_${id}`;
  };
}
