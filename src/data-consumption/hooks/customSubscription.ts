import { useState, useEffect } from 'react';
import { Internal } from '../../index';
import { sortedStringify, concatenateQueryAndVariables, concatenateParameterQueryAndVariables } from '../../utils';
import { CustomEventHookWrapper, CustomEventParameter, GraphqlVariables } from '../../types/common';

// It is necessary to have the most generic type possible here
// therefore we disable the es-lint rule for this file
/* eslint-disable @typescript-eslint/no-explicit-any */
const useCustomSubscription: (query: string, variables?: GraphqlVariables) => any = (
  query: string,
  variables?: GraphqlVariables,
) => {
  const [customDataInfo, setCustomDataInfo] = useState<any>();
  const [queryState, setQueryState] = useState<string>(query);
  const [variablesState, setVariablesState] = useState<GraphqlVariables | undefined>(variables);

  const handleCustomSubscriptionUpdateEvent: EventListener = (
    (event: CustomEventHookWrapper<any>) => {
      if (event.detail.hook === Internal.BbbHooks.UseCustomSubscription
        && event.detail.parameter && concatenateParameterQueryAndVariables(
        event.detail.parameter,
      ) === concatenateQueryAndVariables(queryState, variablesState)) {
        setCustomDataInfo(event.detail.data);
      }
    }) as EventListener;

  if (query !== queryState) {
    setQueryState(query);
  }
  if (sortedStringify(variables) !== sortedStringify(variablesState)) {
    setVariablesState(() => JSON.parse(sortedStringify(variables)));
  }
  useEffect(() => {
    window.addEventListener(Internal.BbbHookEvents.Update, handleCustomSubscriptionUpdateEvent);
    window.dispatchEvent(new CustomEvent(Internal.BbbHookEvents.Subscribe, ({
      detail: {
        hook: Internal.BbbHooks.UseCustomSubscription,
        parameter: {
          query,
          variables,
        } as CustomEventParameter,
      },
    }) as CustomEventHookWrapper<string>));
    return () => {
      window.dispatchEvent(new CustomEvent(Internal.BbbHookEvents.Unsubscribe, {
        detail: {
          hook: Internal.BbbHooks.UseCustomSubscription,
          parameter: {
            query,
            variables,
          } as CustomEventParameter,
        },
      } as CustomEventHookWrapper<string>));
      window.removeEventListener(
        Internal.BbbHookEvents.Update,
        handleCustomSubscriptionUpdateEvent,
      );
    };
  }, [queryState, variables]);
  return customDataInfo;
};

export {
  useCustomSubscription,
};
/* eslint-disable @typescript-eslint/no-explicit-any */
