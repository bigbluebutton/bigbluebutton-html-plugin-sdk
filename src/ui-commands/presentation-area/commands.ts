import { PresentationAreaEnum } from './enums';

export const presentationArea = {
  /**
   * Opens the presentation area content automatically.
   */
  open: () => {
    window.dispatchEvent(new Event(PresentationAreaEnum.OPEN));
  },

  /**
   * Closes the presentation area content automatically.
   */
  close: () => {
    window.dispatchEvent(new Event(PresentationAreaEnum.CLOSE));
  },
};
