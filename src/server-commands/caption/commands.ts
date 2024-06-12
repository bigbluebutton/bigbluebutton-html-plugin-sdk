import { CaptionCommandsEnum } from './enum';
import { CaptionSaveCommandArguments } from './types';

export const caption = {
  /**
   * Saves caption texts into the Caption graphql collection.
   *
   * @param captionSaveCommandArguments the text with which the method will save the caption.
   * Refer to {@link CaptionSaveCommandArguments} to understand the argument structure.
   */
  save: (captionSaveCommandArguments: CaptionSaveCommandArguments) => {
    window.dispatchEvent(
      new CustomEvent<
        CaptionSaveCommandArguments
      >(CaptionCommandsEnum.SAVE, {
        detail: captionSaveCommandArguments,
      }),
    );
  },
  addLocale: (captionAddLocaleCommandArguments: string) => {
    window.dispatchEvent(
      new CustomEvent<
        string
      >(CaptionCommandsEnum.ADD_LOCALE, {
        detail: captionAddLocaleCommandArguments,
      }),
    );
  },
};
