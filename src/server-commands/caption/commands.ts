import { CaptionCommandsEnum } from './enum';
import { SaveCaptionCommandArguments } from './types';

export const caption = {
  /**
   * Saves caption texts into the Caption graphql collection.
   *
   * @param SaveCaptionCommandArguments the text with which the method will save the caption.
   * Refer to {@link SaveCaptionCommandArguments} to understand the argument structure.
   */
  save: (saveCaptionCommandArguments: SaveCaptionCommandArguments) => {
    window.dispatchEvent(
      new CustomEvent<
        SaveCaptionCommandArguments
      >(CaptionCommandsEnum.SAVE, {
        detail: saveCaptionCommandArguments,
      }),
    );
  },
};
