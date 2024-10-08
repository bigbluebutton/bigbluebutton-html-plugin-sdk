export interface EventPersistenceDetails<T=object>{
  pluginName: string;
  eventName: string;
  payload: T;
}

export type PersistEventFunction = <T=object>(
  eventName: string,
  payload: T,
) => void;
