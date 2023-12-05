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
