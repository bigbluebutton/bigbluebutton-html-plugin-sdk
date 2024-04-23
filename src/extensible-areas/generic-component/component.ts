import { GenericComponentType } from './enums';
import { GenericComponentInterface, GenericComponentProps } from './types';

// GenericComponent Extensible Area

export class GenericComponentBase {
  id: string = '';

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
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `GenericComponent_${id}`;
  };
}

export class GenericComponentMainContent
  extends GenericComponentBase implements GenericComponentInterface {
  type: GenericComponentType;

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
    super({ contentFunction });
    this.type = GenericComponentType.MAIN_CONTENT;
  }
}

export class GenericComponentSidekickContent
  extends GenericComponentBase implements GenericComponentInterface {
  type: GenericComponentType;

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
    super({ contentFunction });
    this.type = GenericComponentType.SIDEKICK_CONTENT;
  }
}
