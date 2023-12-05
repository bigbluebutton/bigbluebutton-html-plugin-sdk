import { FloatingWindowItemType } from './enums';
import { FloatingWindowItem, FloatingWindowProps } from './types';

// FloatingWindow Extensible Area

export class FloatingWindow implements FloatingWindowItem {
  id: string = '';

  type: FloatingWindowItemType;

  top: number;

  left: number;

  movable: boolean;

  backgroundColor: string;

  boxShadow: string;

  contentFunction: (element: HTMLElement) => void;

  /**
   * Returns object to be used in the setter for the Navigation Bar. In this case,
   * a button.
   *
   * @param top - position in which the the top left corner of the floating window is relative
   * to the top of the rendered window.
   * @param left - position in which the the top left corner of the floating window is relative
   * to the left of the rendered window.
   * @param movable - tells whether the floating window is movable or static.
   * @param backgroundColor - background color of the floating window.
   * @param boxShadow - box shadow to apply to the floating window
   * @param contentFunction - function that gives the html element to render the content of
   * the floating window
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5).
   */
  constructor({
    top,
    left,
    movable,
    backgroundColor,
    boxShadow,
    contentFunction,
  }: FloatingWindowProps) {
    this.top = top;
    this.left = left;
    this.movable = movable;
    this.backgroundColor = backgroundColor;
    this.boxShadow = boxShadow;

    this.contentFunction = contentFunction;
    this.type = FloatingWindowItemType.CONTAINER;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `UserListItemIcon_${id}`;
  };
}
