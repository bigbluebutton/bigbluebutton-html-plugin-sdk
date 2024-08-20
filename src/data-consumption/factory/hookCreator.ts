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
import { DataConsumptionHooks } from '../enums';

const updateCustomHookSubscription = (
  hookName: Hooks,
  handleCustomSubscriptionUpdateEvent: EventListener,
  previousQuery?: string,
  previousVariables?: object,
  currentQuery?: string,
  currentVariables?: object,
) => {
  window.dispatchEvent(
    new CustomEvent<UnsubscribedEventDetails>(HookEvents.PLUGIN_UNSUBSCRIBED_FROM_BBB_CORE, {
      detail: {
        hook: hookName,
        hookArguments: {
          query: previousQuery,
          variables: previousVariables,
        },
      },
    }),
  );
  window.dispatchEvent(
    new CustomEvent<SubscribedEventDetails>(HookEvents.PLUGIN_SUBSCRIBED_TO_BBB_CORE, {
      detail: {
        hook: hookName,
        hookArguments: {
          query: currentQuery,
          variables: currentVariables,
        },
      },
    }),
  );
  window.addEventListener(
    HookEvents.BBB_CORE_SENT_NEW_DATA,
    handleCustomSubscriptionUpdateEvent,
  );
};

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
    window.addEventListener(HookEvents.BBB_CORE_SENT_NEW_DATA, handleCustomSubscriptionUpdateEvent);
    window.dispatchEvent(
      new CustomEvent<SubscribedEventDetails>(HookEvents.PLUGIN_SUBSCRIBED_TO_BBB_CORE, {
        detail: {
          hook: hookName,
          hookArguments,
        },
      }),
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent<UnsubscribedEventDetails>(HookEvents.PLUGIN_UNSUBSCRIBED_FROM_BBB_CORE, {
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
        HookEvents.BBB_CORE_SENT_NEW_DATA,
        handleCustomSubscriptionUpdateEvent,
      );
    };
  }, []);

  useEffect(() => {
    if (hookName === DataConsumptionHooks.CUSTOM_SUBSCRIPTION
      && (prevQueryRef?.current !== queryState || prevVariablesRef.current !== variablesState)) {
      updateCustomHookSubscription(
        hookName,
        handleCustomSubscriptionUpdateEvent,
        prevQueryRef.current,
        prevVariablesRef.current,
        queryState,
        variablesState,
      );
    }
  }, [queryState, variablesState]);
  return hookData;
};
