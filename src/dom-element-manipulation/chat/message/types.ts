export type UseChatMessageDomElementsFunction = (
  messageIds: string[]
) => HTMLDivElement[] | undefined;

export interface ChatMessageDomElementsArguments {
  messageIds: string[];
  pluginUuid: string;
}

export interface UpdatedEventDetailsForChatMessageDomElements {
  messageId: string;
  message: HTMLDivElement;
}
