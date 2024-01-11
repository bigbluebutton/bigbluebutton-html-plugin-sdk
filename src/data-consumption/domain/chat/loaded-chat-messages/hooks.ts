import { DataConsumptionHooks } from '../../../../data-consumption/enums';
import { createDataConsumptionHook } from '../../../factory/hookCreator';
import { LoadedChatMessage } from './types';

export const useLoadedChatMessages = () => createDataConsumptionHook<
  LoadedChatMessage[]
>(
  DataConsumptionHooks.LOADED_CHAT_MESSAGES,
);
