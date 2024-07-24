export interface ChatSendPublicChatMessageCommandArguments {
  textMessageInMarkdownFormat: string;
  pluginCustomMetadata?: string;
}

export interface ChatSendPublicChatMessageEventArguments
 extends ChatSendPublicChatMessageCommandArguments{
  pluginName: string;
  chatId: string
}

export interface ServerCommandsChatObject {
  sendPublicChatMessage: (
    chatSendPublicChatMessageCommandArguments: ChatSendPublicChatMessageCommandArguments
  ) => void;
}
