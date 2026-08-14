import { GraphqlResponseWrapper } from '../../../../core';

export interface LoadedChatMessage {
  createdAt: string;
  message: string;
  messageId: string;
  senderUserId: string;
  // Static throughout the meeting; null for system messages
  senderRole: string | null;
  messageMetadata: string;
}

export type UseLoadedChatMessagesFunction = () => GraphqlResponseWrapper<LoadedChatMessage[]>;
