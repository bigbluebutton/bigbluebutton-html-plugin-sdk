export type UseChatMessageDomElementsFunction = (
  messageIds: string[]
) => HTMLDivElement[] | undefined;

export interface ChatMessageDomElementsArguments {
  messageIds: string[];
}

export interface UpdatedEventDetailsForChatMessageDomElements {
  messageId: string;
  message: HTMLDivElement;
}
