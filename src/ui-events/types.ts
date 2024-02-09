import { ExternalVideoVolumeEventPayloads } from './external-video/volume/types';
import { ChatFormEventPayloads } from './chat/form/types';
import { UserListEventPayloads } from './user-list/types';

export type EventPayloads = ChatFormEventPayloads
  & UserListEventPayloads & ExternalVideoVolumeEventPayloads;

export type EventNames = keyof EventPayloads;

export interface UiEventsHookEventWrapper<T> extends Event {
  detail: T;
}

export type UseUiEventFunction = <
  T extends keyof EventPayloads
>(eventName: T, callback: (payload: UiEventsHookEventWrapper<EventPayloads[T]>) => void) => void;
