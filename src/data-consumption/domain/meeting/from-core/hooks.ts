import { DataConsumptionHooks } from '../../../enums';
import { createDataConsumptionHook } from '../../../factory/hookCreator';
import { Meeting } from './types';

export const useMeeting = () => createDataConsumptionHook<
  Meeting[]
>(
  DataConsumptionHooks.MEETING,
);
