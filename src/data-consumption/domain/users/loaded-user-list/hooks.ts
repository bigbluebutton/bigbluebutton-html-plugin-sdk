import { DataConsumptionHooks } from '../../../../data-consumption/enums';
import { createDataConsumptionHook } from '../../../factory/hookCreator';
import { LoadedUserListData } from './types';

export const useLoadedUserList = () => createDataConsumptionHook<
  LoadedUserListData[]
>(
  DataConsumptionHooks.LOADED_USER_LIST,
);
