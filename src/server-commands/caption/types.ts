export interface CaptionSaveCommandArguments {
  text: string;
  locale: string;
  captionType: string;
}

export interface ServerCommandsCaptionObject {
  save: (captionSaveCommandArguments: CaptionSaveCommandArguments) => void;
  addLocale: (captionAddLocaleCommandArguments: string) => void;
}
