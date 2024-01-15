import { DataConsumptionHooks } from '../../../../data-consumption/enums';
import { createDataConsumptionHook } from '../../../factory/hookCreator';
import { CustomSubscriptionArguments, CustomSubscriptionHookOptions, UseCustomSubscriptionFunction } from './types';

export const useCustomSubscription: UseCustomSubscriptionFunction = <T>(
  query: string,
  options?: CustomSubscriptionHookOptions,
) => createDataConsumptionHook<T>(DataConsumptionHooks.CUSTOM_SUBSCRIPTION, {
  query,
  variables: options?.variables,
} as CustomSubscriptionArguments);
