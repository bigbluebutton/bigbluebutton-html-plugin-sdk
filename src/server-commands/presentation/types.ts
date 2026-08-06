export interface UploadPresentationBase64Content {
  base64: string;
}

export interface UploadPresentationBlobContent {
  blob: Blob;
}

export interface UploadPresentationFileContent {
  file: File;
}

export interface UploadPresentationDataUrlContent {
  dataUrl: string;
}

export type UploadPresentationContent =
  | UploadPresentationBase64Content
  | UploadPresentationBlobContent
  | UploadPresentationFileContent
  | UploadPresentationDataUrlContent;

export interface UploadPresentationCommandArguments {
  content: UploadPresentationContent;
  mimeType: string;
  filename?: string;
}

export interface InsertPagesCommandArguments {
  // 1-based position where the new pages are inserted. Out-of-range values are
  // clamped by the server (1 -> prepend, totalPages + 1 -> append).
  position: number;
  // The file to convert into pages. `null` inserts a single blank page.
  content: UploadPresentationContent | null;
  mimeType?: string;
  filename?: string;
}

export interface ServerCommandsPresentationObject {
  upload: (uploadPresentationCommandArguments: UploadPresentationCommandArguments) => void;
  insertPages: (
    position: number,
    content?: UploadPresentationContent | null,
    mimeType?: string,
    filename?: string,
  ) => void;
}
