import { GenericComponentType } from './enums';
import { GenericComponentInterface, GenericComponentProps } from './types';

// GenericComponent Extensible Area

export class GenericComponent implements GenericComponentInterface {
  id: string = '';

  type: GenericComponentType;

  contentFunction: (element: HTMLElement) => void;

  /**
   * Returns object to be used in the setter as a generic component
   *
   * @param contentFunction - function that gives the html element to render the content of
   * the generic component
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5).
   */
  constructor({
    contentFunction,
  }: GenericComponentProps) {
    this.contentFunction = contentFunction;
    this.type = GenericComponentType.CONTAINER;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `GenericComponent_${id}`;
  };
}
