import { GenericContentType } from './enums';
import { GenericContentInterface, GenericContentProps } from './types';

// GenericContent Extensible Area

export class GenericContent implements GenericContentInterface {
  id: string = '';

  type: GenericContentType;

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
  }: GenericContentProps) {
    this.contentFunction = contentFunction;
    this.type = GenericContentType.CONTAINER;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `GenericContent_${id}`;
  };
}
