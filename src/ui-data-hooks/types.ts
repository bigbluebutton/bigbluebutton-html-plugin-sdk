import { IntlLocaleUiDataPayloads } from './intl/locale/types';

export type UiDataPayloads = IntlLocaleUiDataPayloads;

export type UiDataNames = keyof UiDataPayloads;

export interface UiDataHookPayloadWrapper<T> extends Event {
  detail: T;
}

export type UseUiDataFunction = <
  T extends keyof UiDataPayloads
>(dataName: T, defaultValue: UiDataPayloads[T]) => UiDataPayloads[T];
