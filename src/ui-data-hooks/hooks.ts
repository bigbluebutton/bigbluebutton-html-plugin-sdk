import { useEffect, useState } from 'react';
import { UiDataPayloads } from './types';
import { UI_DATA_LISTENER_SUBSCRIBED } from './consts';

export function useUiData<
  T extends keyof UiDataPayloads
>(dataName: T, defaultValue: UiDataPayloads[T]): UiDataPayloads[T] {
  const [data, setData] = useState<UiDataPayloads[T]>(defaultValue);
  const dataStoringFunction = ((customEvent: CustomEvent<UiDataPayloads[T]>) => {
    setData(customEvent.detail);
  }) as EventListener;

  useEffect(() => {
    window.addEventListener(dataName, dataStoringFunction);
    window.dispatchEvent(new Event(`${UI_DATA_LISTENER_SUBSCRIBED}-${dataName}`));
    return () => {
      window.removeEventListener(dataName, dataStoringFunction);
    };
  }, []);

  return data;
}
