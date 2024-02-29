import { ChatFormUiDataPayloads } from './chat/form/types';
import { ExternalVideoVolumeUiDataPayloads } from './external-video/volume/types';
import { IntlLocaleUiDataPayloads } from './intl/locale/types';
import { LayoutPresentationAreaUiDataPayloads } from './layout/presentation-area/types';
import { UserListUiDataPayloads } from './user-list/types';

export type UiDataPayloads = IntlLocaleUiDataPayloads & ChatFormUiDataPayloads
& UserListUiDataPayloads & ExternalVideoVolumeUiDataPayloads & LayoutPresentationAreaUiDataPayloads
export type UiDataNames = keyof UiDataPayloads;

export interface UiDataHookPayloadWrapper<T> extends Event {
  detail: T;
}

export type UseUiDataFunction = <
  T extends keyof UiDataPayloads
>(dataName: T, defaultValue: UiDataPayloads[T]) => UiDataPayloads[T];
