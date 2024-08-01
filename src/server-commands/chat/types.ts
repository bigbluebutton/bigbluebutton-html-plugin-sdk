export interface ChatSendMessageCommandArguments {
  textMessageInMarkdownFormat: string;
  pluginCustomMetadata?: string;
}

export interface ChatSendMessageEventArguments
 extends ChatSendMessageCommandArguments {
  pluginName: string;
  chatId: string;
  custom: boolean;
}

export interface ServerCommandsChatObject {
  sendCustomPublicChatMessage: (
    chatSendCustomPublicChatMessageCommandArguments: ChatSendMessageCommandArguments
  ) => void;
  sendPublicChatMessage: (
    chatSendPublicChatMessageCommandArguments: ChatSendMessageCommandArguments
  ) => void;
}
