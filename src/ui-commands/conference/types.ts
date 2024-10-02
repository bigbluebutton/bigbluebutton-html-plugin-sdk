export interface SetSpeakerLevelCommandArguments {
  level: number;
}

export interface UiCommandsConferenceObject {
  setSpeakerLevel: (setSpeakerlevelCommandArguments: SetSpeakerLevelCommandArguments) => void;
}
