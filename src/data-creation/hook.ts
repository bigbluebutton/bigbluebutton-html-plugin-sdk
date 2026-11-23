import { useEffect, useState } from 'react';
import {
  MutationResultObject,
  MutationHookResultType,
  MutationVariablesWrapper,
  UseCustomMutationReturnType,
} from './types';
import { HookEvents } from '../core/enum';
import {
  GraphqlResponseWrapper,
  HookEventWrapper,
  SubscribedEventDetails,
  UpdatedEventDetails,
} from '../core/types';
import { DataCreationHookEnums } from './enums';
import validateMutationEventFromClient from './utils';
import { currentPluginName } from '../utils/plugin-identity';

export function useCustomMutation<T>(
  mutation: string,
  options?: object,
): UseCustomMutationReturnType<T> {
  const [mutationHookResult, setMutationHookResult] = useState<MutationHookResultType<T>>(
    {
      triggerFunction: null,
      result: {
        loading: true,
        called: false,
      },
    },
  );

  const triggerFunction = ((data: MutationVariablesWrapper<T>) => {
    window.dispatchEvent(
      new CustomEvent<UpdatedEventDetails<
        MutationVariablesWrapper<T>
      >>(HookEvents.PLUGIN_SENT_CHANGES_TO_BBB_CORE, {
        detail: {
          hook: DataCreationHookEnums.TRIGGER_MUTATION,
          hookArguments: {
            mutation,
            options,
          },
          data,
          pluginName: currentPluginName(),
        },
      }),
    );
  });

  // This function is responsible for setting the trigger function of the mutation
  const handleMutationReadyEvent: EventListener = (
    (event: HookEventWrapper<GraphqlResponseWrapper<void>>) => {
      validateMutationEventFromClient(
        setMutationHookResult,
        (prevMutationResultObject) => ({
          triggerFunction,
          result: prevMutationResultObject.result,
        }),
        DataCreationHookEnums.MUTATION_READY,
        event,
        mutation,
        options,
      );
    }) as EventListener;

  // This function is responsible for setting the result of the mutation;
  const handleMutationResultSentEvent: EventListener = (
    (event: HookEventWrapper<GraphqlResponseWrapper<void>>) => {
      validateMutationEventFromClient<T, MutationResultObject>(
        setMutationHookResult,
        (prevMutationResultObject, dataFromEvent) => ({
          triggerFunction: prevMutationResultObject.triggerFunction,
          result: dataFromEvent,
        }),
        DataCreationHookEnums.MUTATION_RESULT_SENT,
        event,
        mutation,
        options,
      );
    }) as EventListener;

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent<SubscribedEventDetails>(HookEvents.PLUGIN_SUBSCRIBED_TO_BBB_CORE, {
        detail: {
          hook: DataCreationHookEnums.CREATE_NEW_CUSTOM_MUTATION,
          hookArguments: {
            mutation,
            options,
          },
          pluginName: currentPluginName(),
        },
      }),
    );
    window.addEventListener(
      HookEvents.BBB_CORE_UPDATED_STATE,
      handleMutationReadyEvent,
    );
    window.addEventListener(
      HookEvents.BBB_CORE_UPDATED_STATE,
      handleMutationResultSentEvent,
    );

    return () => {
      window.dispatchEvent(
        new CustomEvent<SubscribedEventDetails>(HookEvents.PLUGIN_UNSUBSCRIBED_FROM_BBB_CORE, {
          detail: {
            hook: DataCreationHookEnums.CREATE_NEW_CUSTOM_MUTATION,
            hookArguments: {
              mutation,
              options,
            },
            pluginName: currentPluginName(),
          },
        }),
      );
      window.removeEventListener(
        HookEvents.BBB_CORE_UPDATED_STATE,
        handleMutationReadyEvent,
      );
      window.removeEventListener(
        HookEvents.BBB_CORE_UPDATED_STATE,
        handleMutationResultSentEvent,
      );
    };
  }, []);

  return [mutationHookResult.triggerFunction, mutationHookResult.result];
}
