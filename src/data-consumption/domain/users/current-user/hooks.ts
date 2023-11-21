import { Hooks } from '../../../../core/enum';
import { createDataConsumptionHook } from '../../../factory/hookCreator';
import { CurrentUserData } from './types';

export const useCurrentUser = () => createDataConsumptionHook<
CurrentUserData>(
  Hooks.CURRENT_USER,
);
