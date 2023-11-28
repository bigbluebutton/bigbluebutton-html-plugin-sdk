import { createDataConsumptionHook } from '../../../factory/hookCreator';
import { Hooks } from '../../../../core/enum';
import { CustomSubscriptionArguments, CustomSubscriptionHookOptions, UseCustomSubscriptionFunction } from './types';

export const useCustomSubscription: UseCustomSubscriptionFunction = <T>(
  query: string,
  options?: CustomSubscriptionHookOptions,
) => createDataConsumptionHook<T>(Hooks.CUSTOM_SUBSCRIPTION, {
  query,
  variables: options?.variables,
} as CustomSubscriptionArguments);
