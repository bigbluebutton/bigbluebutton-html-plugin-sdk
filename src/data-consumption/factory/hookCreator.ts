import { useState, useEffect } from 'react';

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

export const createDataConsumptionHook = <T>(
  hookName: Hooks,
  hookArguments?: CustomSubscriptionArguments,
) => {
  const [hookData, setHookData] = useState<GraphqlResponseWrapper<T>>({ loading: true });
  const [queryState, setQueryState] = useState<string | undefined>(hookArguments?.query);
  const [variablesState, setVariablesState] = useState<object | undefined>(
    hookArguments?.variables,
  );

  // Only custom subscriptions follow query/variables changes and resubscribe.
  // Other hooks keep the arguments they mounted with, so queryState and
  // variablesState always mirror what is currently subscribed in BBB core.
  if (hookName === DataConsumptionHooks.CUSTOM_SUBSCRIPTION) {
    if (hookArguments?.query !== queryState) {
      setQueryState(hookArguments?.query);
    }
    if (
      sortedStringify(hookArguments?.variables)
      !== sortedStringify(variablesState)
    ) {
      setVariablesState(() => JSON.parse(sortedStringify(hookArguments?.variables)));
    }
  }

  useEffect(() => {
    const handleDataUpdateEvent: EventListener = (
    (event: HookEventWrapper<GraphqlResponseWrapper<T>>) => {
      if (event.detail.hook !== hookName) return;
      const detail = event.detail as UpdatedEventDetails<GraphqlResponseWrapper<T>>;
      if (hookArguments) {
        const dataConsumptionHookArguments = detail.hookArguments as CustomSubscriptionArguments;
        if (queryState && detail.hookArguments && makeCustomHookIdentifierFromArgs(
          dataConsumptionHookArguments,
        ) === makeCustomHookIdentifier(queryState, variablesState)) {
          setHookData(detail.data);
        }
      } else {
        setHookData(detail.data);
      }
    }) as EventListener;

    const subscriptionArguments = hookArguments
      ? { query: queryState, variables: variablesState }
      : undefined;

    window.addEventListener(HookEvents.BBB_CORE_SENT_NEW_DATA, handleDataUpdateEvent);
    window.dispatchEvent(
      new CustomEvent<SubscribedEventDetails>(HookEvents.PLUGIN_SUBSCRIBED_TO_BBB_CORE, {
        detail: {
          hook: hookName,
          hookArguments: subscriptionArguments,
        },
      }),
    );

    // React runs this cleanup before the effect of the next queryState /
    // variablesState cycle (and on unmount), so BBB core always receives one
    // unsubscribe for exactly the arguments previously subscribed.
    return () => {
      window.dispatchEvent(
        new CustomEvent<UnsubscribedEventDetails>(HookEvents.PLUGIN_UNSUBSCRIBED_FROM_BBB_CORE, {
          detail: {
            hook: hookName,
            hookArguments: subscriptionArguments,
          },
        }),
      );
      window.removeEventListener(
        HookEvents.BBB_CORE_SENT_NEW_DATA,
        handleDataUpdateEvent,
      );
    };
  }, [queryState, variablesState]);

  return hookData;
};
