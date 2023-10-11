import { useEffect } from 'react';
import { BbbUiEvents } from '../../index';
import { CustomEventHookWrapper } from '../../types/common';
import { EventConsumptionCallback, EventData, UseUiEvent } from '../types/event';

const useUiEvent: UseUiEvent = (uiEvent: BbbUiEvents, callback: EventConsumptionCallback) => {
  const handleUiEventUpdate: EventListener = (
    (event: CustomEventHookWrapper<EventData>) => {
      if (callback && event.detail) {
        callback(event.detail.data);
      } else if (callback) {
        callback();
      }
    }) as EventListener;
  useEffect(() => {
    window.addEventListener(uiEvent, handleUiEventUpdate);
    return () => {
      window.removeEventListener(
        uiEvent,
        handleUiEventUpdate,
      );
    };
  }, []);
};

export {
  useUiEvent,
};
