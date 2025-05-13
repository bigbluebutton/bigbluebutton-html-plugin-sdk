import { LayoutPresentationAreaUiDataNames, UiLayouts } from './enums';

export type LayoutPresentationAreaUiDataPayloads = {
  [LayoutPresentationAreaUiDataNames.CURRENT_ELEMENT]: {
    currentElement?: UiLayouts,
    genericContentId?: string,
    isOpen: boolean,
  }[];
};
