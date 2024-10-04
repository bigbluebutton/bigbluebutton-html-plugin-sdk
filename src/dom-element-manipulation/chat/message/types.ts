export type UseChatMessageDomElementsFunction = (
  messageIds: string[]
) => HTMLDivElement[] | undefined;

export interface ChatMessageDomElementsArguments {
  messageIds: string[];
  pluginUuid: string;
}

export interface MessageDetails {
  messageId: string;
  message: HTMLDivElement;
}

export interface UpdatedEventDetailsForChatMessageDomElements {
  page: number;
  messages: MessageDetails[];
}

export interface RenderedChatMessages {
  [pageNumber: number]: HTMLDivElement[];
}
