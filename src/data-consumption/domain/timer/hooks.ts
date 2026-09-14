import { DataConsumptionHooks } from '../../enums';
import { createDataConsumptionHook } from '../../factory/hookCreator';
import { TimerData } from './types';

export const useTimer = () => createDataConsumptionHook<TimerData>(
  DataConsumptionHooks.TIMER,
);
