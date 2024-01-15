import { DataConsumptionHooks } from '../../../../data-consumption/enums';
import {
  CurrentPresentation,
} from './types';
import { createDataConsumptionHook } from '../../../factory/hookCreator';

export const useCurrentPresentation = () => createDataConsumptionHook<CurrentPresentation>(
  DataConsumptionHooks.CURRENT_PRESENTATION,
);
