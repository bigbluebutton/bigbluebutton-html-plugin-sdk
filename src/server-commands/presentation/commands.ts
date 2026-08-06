import { PresentationCommandsEnum } from './enum';
import {
  InsertPagesCommandArguments,
  UploadPresentationCommandArguments,
  UploadPresentationContent,
} from './types';

export const presentation = {
  /**
   * Uploads a presentation (if presenter, ignores otherwise): Image, PDF, etc.
   *
   * @param uploadPresentationCommandArguments Content which will be sent to be uploaded
   *  as presentation - Can be base64 or url.
   */
  upload: (uploadPresentationCommandArguments: UploadPresentationCommandArguments) => {
    window.dispatchEvent(
      new CustomEvent<
        UploadPresentationCommandArguments
      >(PresentationCommandsEnum.UPLOAD, {
        detail: uploadPresentationCommandArguments,
      }),
    );
  },

  /**
   * Inserts pages into the current presentation at a given position (if presenter,
   * ignores otherwise).
   *
   * @param position 1-based position where the pages are inserted. Out-of-range
   *  values are clamped by the server (1 prepends, totalPages + 1 appends).
   * @param content The file to convert into pages. Pass `null` (or omit) to insert a
   *  single blank page.
   * @param mimeType Optional mime type of the content (e.g. `application/pdf`).
   * @param filename Optional original filename.
   */
  insertPages: (
    position: number,
    content?: UploadPresentationContent | null,
    mimeType?: string,
    filename?: string,
  ) => {
    window.dispatchEvent(
      new CustomEvent<
        InsertPagesCommandArguments
      >(PresentationCommandsEnum.INSERT_PAGES, {
        detail: {
          position,
          content: content ?? null,
          mimeType,
          filename,
        },
      }),
    );
  },
};
