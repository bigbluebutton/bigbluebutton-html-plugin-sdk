import { BbbUiEvents } from '../../index';

interface EventData {}

interface ChatChangedEventData extends EventData {
  currentText: string;
}

type EventConsumptionCallback = (data?: EventData) => void;

type UseUiEvent = (uiEvent: BbbUiEvents, callback: EventConsumptionCallback) => void;

export {
  ChatChangedEventData,
  EventData,
  EventConsumptionCallback,
  UseUiEvent,
};
