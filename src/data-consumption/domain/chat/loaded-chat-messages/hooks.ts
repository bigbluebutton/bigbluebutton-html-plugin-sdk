import { Hooks } from '../../../../core/enum';
import { createDataConsumptionHook } from '../../../factory/hookCreator';
import { LoadedChatMessage } from './types';

export const useLoadedChatMessages = () => createDataConsumptionHook<
  LoadedChatMessage[]
>(
  Hooks.LOADED_CHAT_MESSAGES,
);
