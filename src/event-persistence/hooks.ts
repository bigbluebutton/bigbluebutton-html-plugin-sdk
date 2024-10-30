import {
  EventPersistenceDetails,
} from './types';
import { EventPersistenceEvents } from './enums';

export const persistEventFunctionWrapper = <T=object>(
  pluginName: string,
  eventName: string,
  payload: T,
) => {
  window.dispatchEvent(
    new CustomEvent<
    EventPersistenceDetails<T>>(EventPersistenceEvents.EVENT_PERSISTED, {
      detail: {
        pluginName,
        eventName,
        payload,
      },
    }),
  );
};
