import { GraphqlResponseWrapper } from '../../../../core';

export interface LoadedChatMessage {
  createdAt: string;
  message: string;
  messageId: string;
  senderUserId: string;
}

export type UseLoadedChatMessagesFunction = () => GraphqlResponseWrapper<LoadedChatMessage[]>;
