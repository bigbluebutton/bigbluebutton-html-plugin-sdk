import { DataConsumptionHooks } from '../../../../data-consumption/enums';
import { createDataConsumptionHook } from '../../../factory/hookCreator';
import { CurrentUserData } from './types';

export const useCurrentUser = () => createDataConsumptionHook<
CurrentUserData>(
  DataConsumptionHooks.CURRENT_USER,
);
