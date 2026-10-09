import { GraphqlResponseWrapper } from '../../../../core';

export interface LoadedChatMessage {
  createdAt: string;
  message: string | null;
  messageId: string;
  senderUserId: string;
  senderRole: string;
  messageMetadata: string;
  deletedAt: string | null;
  deletedBy: {
    name: string;
  } | null;
}

export type UseLoadedChatMessagesFunction = () => GraphqlResponseWrapper<LoadedChatMessage[]>;
