export interface SaveCaptionCommandArguments {
  text: string;
}
export interface ServerCommandsCaptionObject {
  save: (saveCaptionCommandArguments: SaveCaptionCommandArguments) => void;
}
