import { ApolloError } from '@apollo/client';
import { CustomSubscriptionArguments } from '../data-consumption/domain/shared/custom-subscription/types';
import { Hooks } from './enum';
import { DataChannelArguments } from '../data-channel';

export interface GraphqlResponseWrapper<TData> {
  loading: boolean;
  data?: TData;
  error?: ApolloError;
}

export type HookArguments = CustomSubscriptionArguments | DataChannelArguments;

export interface UpdatedEventDetails<T> {
  hook: Hooks;
  hookArguments?: HookArguments;
  data: T;
}

export interface SubscribedEventDetails {
  hook: Hooks;
  hookArguments?: HookArguments;
}

export interface UnsubscribedEventDetails {
  hook: Hooks;
  hookArguments?: HookArguments;
}

export interface HookEventWrapper<T> extends Event {
  detail: UpdatedEventDetails<T> | SubscribedEventDetails | UnsubscribedEventDetails;
}
