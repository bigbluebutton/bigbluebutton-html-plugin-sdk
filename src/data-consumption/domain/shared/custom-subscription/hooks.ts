import { createDataConsumptionHook } from '../../../factory/hookCreator';
import { Hooks } from '../../../../core/enum';
import { CustomSubscriptionArguments, VariablesObjectWrapper } from './types';

export const useCustomSubscription = <T>(
  query: string,
  variablesObjectWrapper?: VariablesObjectWrapper,
) => createDataConsumptionHook<T>(Hooks.CUSTOM_SUBSCRIPTION, {
  query,
  variables: variablesObjectWrapper?.variables,
} as CustomSubscriptionArguments);
