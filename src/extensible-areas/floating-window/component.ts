import * as ReactDOM from 'react-dom/client';
import { FloatingWindowType } from './enums';
import { FloatingWindowInterface, FloatingWindowProps } from './types';

// FloatingWindow Extensible Area

export class FloatingWindow implements FloatingWindowInterface {
  id: string = '';

  type: FloatingWindowType;

  top: number;

  left: number;

  movable: boolean;

  backgroundColor: string;

  boxShadow: string;

  contentFunction: (element: HTMLElement) => ReactDOM.Root;

  /**
   * Returns object to be used in the setter for the Floating Window
   *
   * @param top - position in which the the top left corner of the floating window is relative
   * to the top of the rendered window. It must return the root element where the floating window
   * was rendered.
   * @param left - position in which the the top left corner of the floating window is relative
   * to the left of the rendered window.
   * @param movable - tells whether the floating window is movable or static.
   * @param backgroundColor - background color of the floating window.
   * @param boxShadow - box shadow to apply to the floating window
   * @param contentFunction - function that gives the html element to render the content of
   * the floating window. It must return the root element where the floating window was rendered.
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5).
   */
  constructor({
    id,
    top,
    left,
    movable,
    backgroundColor,
    boxShadow,
    contentFunction,
  }: FloatingWindowProps) {
    if (id) {
      this.id = id;
    }
    this.top = top;
    this.left = left;
    this.movable = movable;
    this.backgroundColor = backgroundColor;
    this.boxShadow = boxShadow;

    this.contentFunction = contentFunction;
    this.type = FloatingWindowType.CONTAINER;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `FloatingWindow_${id}`;
  };
}
