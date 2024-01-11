import { ApolloError } from '@apollo/client';
import { CustomSubscriptionArguments } from '../data-consumption/domain/shared/custom-subscription/types';
import { Hooks } from './enum';
import { DataChannelArguments } from '../data-channel/types';
import { DomElementManipulationArguments } from '../dom-element-manipulation/type';

/**
 * Wrapper for the data that comes from the core. With this more complex object
 * it is also possible to know whether the data is still loading, of even if something
 * wrong happened.
 *
 * @typeParam TData - Data that the developer will be expecting from the core.
 */
export interface GraphqlResponseWrapper<TData> {
  loading: boolean;
  data?: TData;
  error?: ApolloError;
}

export type HookArguments = CustomSubscriptionArguments | DataChannelArguments
  | DomElementManipulationArguments;

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
