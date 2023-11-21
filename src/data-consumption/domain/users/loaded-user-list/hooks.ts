import { Hooks } from '../../../../core/enum';
import { createDataConsumptionHook } from '../../../factory/hookCreator';
import { LoadedUserListData } from './types';

export const useLoadedUserList = () => createDataConsumptionHook<
  LoadedUserListData[]
>(
  Hooks.LOADED_USER_LIST,
);
