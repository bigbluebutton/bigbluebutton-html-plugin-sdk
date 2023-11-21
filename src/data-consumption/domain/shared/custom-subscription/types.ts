import { GraphqlResponseWrapper } from '../../../../core';

export interface CustomSubscriptionArguments {
  query?: string;
  variables?: object;
}

export interface VariablesObjectWrapper {
  variables: object;
}

export type UseCustomSubscription = <T>(
  query: string,
  variablesObjectWrapper?: VariablesObjectWrapper,
) => GraphqlResponseWrapper<T>;
