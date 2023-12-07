import { useEffect } from 'react';
import { EventPayloads, UiEventsHookEventWrapper } from './types';

export function useUiEvent<
  T extends keyof EventPayloads
>(eventName: T, callback: (payload: UiEventsHookEventWrapper<EventPayloads[T]>) => void): void {
  useEffect(() => {
    window.addEventListener(eventName, callback as EventListener);
    return () => {
      window.removeEventListener(eventName, callback as EventListener);
    };
  }, []);
}
