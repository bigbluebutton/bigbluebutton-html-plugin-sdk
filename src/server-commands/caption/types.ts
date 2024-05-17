export interface SaveCaptionCommandArguments {
  text: string;
  locale: string;
}
export interface ServerCommandsCaptionObject {
  save: (saveCaptionCommandArguments: SaveCaptionCommandArguments) => void;
}
