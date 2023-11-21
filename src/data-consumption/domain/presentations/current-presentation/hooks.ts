import {
  Hooks,
} from '../../../../core';
import {
  CurrentPresentation,
} from './types';
import { createDataConsumptionHook } from '../../../factory/hookCreator';

export const useCurrentPresentation = () => createDataConsumptionHook<CurrentPresentation>(
  Hooks.CURRENT_PRESENTATION,
);
