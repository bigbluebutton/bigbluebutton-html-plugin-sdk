import { useState, useEffect, useRef } from 'react';

import { Hooks, HookEvents } from '../../core/enum';
import { CustomSubscriptionArguments } from '../domain/shared/custom-subscription/types';
import {
  GraphqlResponseWrapper,
  HookEventWrapper,
  SubscribedEventDetails,
  UnsubscribedEventDetails,
  UpdatedEventDetails,
} from '../../core/types';
import {
  sortedStringify,
  makeCustomHookIdentifier,
  makeCustomHookIdentifierFromArgs,
} from '../utils';

export const createDataConsumptionHook = <T>(
  hookName: Hooks,
  hookArguments?: CustomSubscriptionArguments,
) => {
  const [hookData, setHookData] = useState<GraphqlResponseWrapper<T>>({ loading: true });
  const prevQueryRef = useRef<string | undefined>(hookArguments?.query);
  const prevVariablesRef = useRef<object | undefined>(
    hookArguments?.variables,
  );
  const [queryState, setQueryState] = useState<string | undefined>(hookArguments?.query);
  const [variablesState, setVariablesState] = useState<object | undefined>(
    hookArguments?.variables,
  );

  const handleCustomSubscriptionUpdateEvent: EventListener = (
    (event: HookEventWrapper<GraphqlResponseWrapper<T>>) => {
      const detail = event.detail as UpdatedEventDetails<GraphqlResponseWrapper<T>>;
      if (hookArguments && event.detail.hook === hookName) {
        const dataConsumptionHookArguments = detail.hookArguments as CustomSubscriptionArguments;
        if (queryState && detail.hookArguments && makeCustomHookIdentifierFromArgs(
          dataConsumptionHookArguments,
        ) === makeCustomHookIdentifier(queryState, variablesState)) {
          setHookData(detail.data);
        }
      } else if (!hookArguments && event.detail.hook === hookName) {
        setHookData(detail.data);
      }
    }) as EventListener;

  if (hookArguments?.query !== queryState) {
    prevQueryRef.current = queryState;
    setQueryState(hookArguments?.query);
  }
  if (sortedStringify(hookArguments?.variables) !== sortedStringify(variablesState)) {
    prevVariablesRef.current = variablesState;
    setVariablesState(() => JSON.parse(sortedStringify(hookArguments?.variables)));
  }
  useEffect(() => {
    window.addEventListener(HookEvents.UPDATED, handleCustomSubscriptionUpdateEvent);
    window.dispatchEvent(
      new CustomEvent<SubscribedEventDetails>(HookEvents.SUBSCRIBED, {
        detail: {
          hook: hookName,
          hookArguments,
        },
      }),
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent<UnsubscribedEventDetails>(HookEvents.UNSUBSCRIBED, {
          detail: {
            hook: hookName,
            hookArguments: {
              query: queryState,
              variables: variablesState,
            },
          },
        }),
      );
      window.removeEventListener(
        HookEvents.UPDATED,
        handleCustomSubscriptionUpdateEvent,
      );
    };
  }, []);

  useEffect(() => {
    if (hookName === Hooks.CUSTOM_SUBSCRIPTION) {
      if (prevQueryRef?.current !== queryState || prevVariablesRef.current !== variablesState) {
        window.dispatchEvent(
          new CustomEvent<UnsubscribedEventDetails>(HookEvents.UNSUBSCRIBED, {
            detail: {
              hook: hookName,
              hookArguments: {
                query: prevQueryRef.current,
                variables: prevVariablesRef.current,
              },
            },
          }),
        );
        window.dispatchEvent(
          new CustomEvent<SubscribedEventDetails>(HookEvents.SUBSCRIBED, {
            detail: {
              hook: hookName,
              hookArguments: {
                query: queryState,
                variables: variablesState,
              },
            },
          }),
        );
        window.removeEventListener(
          HookEvents.UPDATED,
          handleCustomSubscriptionUpdateEvent,
        );
        window.addEventListener(
          HookEvents.UPDATED,
          handleCustomSubscriptionUpdateEvent,
        );
      }
    }
  }, [queryState, variablesState]);
  return hookData;
};
