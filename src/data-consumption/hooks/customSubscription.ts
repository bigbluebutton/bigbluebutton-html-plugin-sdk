import { useState, useEffect } from 'react';
import { Internal } from '../../index';
import { sortedStringify, concatenateQueryAndVariables, concatenateParameterQueryAndVariables } from '../../utils';
import {
  CustomEventHookWithParameters, CustomEventHookWrapper, CustomEventParameter, GraphqlVariables,
} from '../../types/common';

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
      if (event.detail.hook === Internal.BbbHooks.UseCustomSubscription) {
        const detail = event.detail as CustomEventHookWithParameters<any>;
        if (detail.parameter && concatenateParameterQueryAndVariables(
          detail.parameter,
        ) === concatenateQueryAndVariables(queryState, variablesState)) {
          setCustomDataInfo(detail.data);
        }
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
    window.dispatchEvent(
      new CustomEvent<CustomEventHookWithParameters<void>>(Internal.BbbHookEvents.Subscribe, {
        detail: {
          hook: Internal.BbbHooks.UseCustomSubscription,
          parameter: {
            query,
            variables,
          } as CustomEventParameter,
        } as CustomEventHookWithParameters<void>,
      }),
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent<CustomEventHookWithParameters<void>>(Internal.BbbHookEvents.Unsubscribe, {
          detail: {
            hook: Internal.BbbHooks.UseCustomSubscription,
            parameter: {
              query,
              variables,
            } as CustomEventParameter,
          } as CustomEventHookWithParameters<void>,
        }),
      );
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
