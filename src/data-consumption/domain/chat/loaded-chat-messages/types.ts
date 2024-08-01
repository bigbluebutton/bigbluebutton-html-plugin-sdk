import { GraphqlResponseWrapper } from '../../../../core';

export interface LoadedChatMessage {
  createdAt: string;
  message: string;
  messageId: string;
  senderUserId: string;
  messageMetadata: string;
}

export type UseLoadedChatMessagesFunction = () => GraphqlResponseWrapper<LoadedChatMessage[]>;
