import { DataConsumptionHooks } from '../../../../data-consumption/enums';
import { createDataConsumptionHook } from '../../../factory/hookCreator';
import { UserVoice } from './types';

export const useTalkingIndicator = () => createDataConsumptionHook<
  UserVoice[]
>(
  DataConsumptionHooks.TALKING_INDICATOR,
);
