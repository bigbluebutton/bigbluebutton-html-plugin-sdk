import { GraphqlResponseWrapper } from '../../../../core';

export interface CustomSubscriptionArguments {
  query?: string;
  variables?: object;
}

export interface CustomSubscriptionHookOptions {
  variables: object;
}

export type UseCustomSubscriptionFunction = <T>(
  query: string,
  variablesObjectWrapper?: CustomSubscriptionHookOptions,
) => GraphqlResponseWrapper<T>;
