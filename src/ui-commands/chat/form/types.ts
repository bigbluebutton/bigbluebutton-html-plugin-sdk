export interface FillChatFormCommandArguments {
  text: string;
}

export interface UiCommandsChatFormObject {
  open: () => void;
  fill: (FillChatFormCommandArguments: FillChatFormCommandArguments) => void;
}
