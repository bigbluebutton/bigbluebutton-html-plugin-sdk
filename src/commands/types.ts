import { PollType } from '../enums';

export interface Answer {
  val: string;
}

export interface FillingDataForm {
  question: string;
  answers?: Answer[];
  pollType: PollType;
}

export interface Form {
  open: () => void;
  fill: (data: FillingDataForm) => void;
}

export interface PollCreation {
  form: Form;
}

export interface UiCommands {
  pollCreation: PollCreation;
}
