import {
  describe, it, expect, beforeEach, afterEach,
} from 'vitest';
import { renderHook, act } from '@testing-library/react';

import { createDataConsumptionHook } from '../../../../src/data-consumption/factory/hookCreator';
import { HookEvents } from '../../../../src/core/enum';
import { DataConsumptionHooks } from '../../../../src/data-consumption/enums';
import { CustomSubscriptionArguments } from '../../../../src/data-consumption/domain/shared/custom-subscription/types';
import {
  SubscribedEventDetails,
  UnsubscribedEventDetails,
} from '../../../../src/core/types';
import { makeCustomHookIdentifierFromArgs } from '../../../../src/data-consumption/utils';
import { CaptionData } from '../../types';
import {
  QUERY_WITH_ONE_VARIABLE,
  QUERY_WITH_TWO_VARIABLES,
  EN_VARIABLES,
  PT_BR_VARIABLES,
} from '../../queries';

describe('createDataConsumptionHook', () => {
  let subscribeEvents: SubscribedEventDetails[];
  let unsubscribeEvents: UnsubscribedEventDetails[];
  let recorders: [string, EventListener][];

  const recordEvent = (eventName: HookEvents, sink: { hook: unknown }[]) => {
    const listener: EventListener = ((event: CustomEvent) => {
      sink.push(event.detail);
    }) as EventListener;
    window.addEventListener(eventName, listener);
    recorders.push([eventName, listener]);
  };

  beforeEach(() => {
    subscribeEvents = [];
    unsubscribeEvents = [];
    recorders = [];
    recordEvent(HookEvents.PLUGIN_SUBSCRIBED_TO_BBB_CORE, subscribeEvents);
    recordEvent(HookEvents.PLUGIN_UNSUBSCRIBED_FROM_BBB_CORE, unsubscribeEvents);
  });

  afterEach(() => {
    recorders.forEach(([eventName, listener]) => {
      window.removeEventListener(eventName, listener);
    });
  });

  const variablesOf = (
    details: SubscribedEventDetails | UnsubscribedEventDetails,
  ) => (details.hookArguments as CustomSubscriptionArguments | undefined)?.variables;

  const sendData = (
    hook: string,
    hookArguments: CustomSubscriptionArguments | undefined,
    data: object,
  ) => {
    act(() => {
      window.dispatchEvent(new CustomEvent(HookEvents.BBB_CORE_SENT_NEW_DATA, {
        detail: { hook, hookArguments, data },
      }));
    });
  };

  // Simulates the core behavior after bigbluebutton/bigbluebutton#23816 and
  // #24815: whenever a subscribe event arrives (version bump), the hook
  // container re-dispatches its current data to all listeners.
  const respondToSubscribesWith = (data: object) => {
    const listener: EventListener = ((event: CustomEvent) => {
      const { hook, hookArguments } = event.detail;
      window.dispatchEvent(new CustomEvent(HookEvents.BBB_CORE_SENT_NEW_DATA, {
        detail: { hook, hookArguments, data },
      }));
    }) as EventListener;
    window.addEventListener(HookEvents.PLUGIN_SUBSCRIBED_TO_BBB_CORE, listener);
    recorders.push([HookEvents.PLUGIN_SUBSCRIBED_TO_BBB_CORE, listener]);
  };

  const renderCustomSubscriptionHook = (initialVariables: object) => renderHook(
    ({ variables }: { variables: object }) => createDataConsumptionHook<CaptionData>(
      DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
      { query: QUERY_WITH_ONE_VARIABLE, variables },
    ),
    { initialProps: { variables: initialVariables } },
  );

  const renderCustomQueryHook = (initialVariables: object) => renderHook(
    ({ variables }: { variables: object }) => createDataConsumptionHook<CaptionData>(
      DataConsumptionHooks.CUSTOM_QUERY,
      { query: QUERY_WITH_ONE_VARIABLE, variables },
    ),
    { initialProps: { variables: initialVariables } },
  );

  describe('custom subscription lifecycle', () => {
    it('subscribes with the initial arguments on mount', () => {
      renderCustomSubscriptionHook(EN_VARIABLES);

      expect(subscribeEvents).toHaveLength(1);
      expect(subscribeEvents[0].hook).toBe(DataConsumptionHooks.CUSTOM_SUBSCRIPTION);
      expect(subscribeEvents[0].hookArguments).toEqual({
        query: QUERY_WITH_ONE_VARIABLE,
        variables: EN_VARIABLES,
      });
    });

    it('unsubscribes from the old identifier and subscribes to the new one when variables change', () => {
      const { rerender } = renderCustomSubscriptionHook(EN_VARIABLES);

      rerender({ variables: PT_BR_VARIABLES });

      expect(unsubscribeEvents).toHaveLength(1);
      expect(variablesOf(unsubscribeEvents[0])).toEqual(EN_VARIABLES);
      expect(subscribeEvents).toHaveLength(2);
      expect(variablesOf(subscribeEvents[1])).toEqual(PT_BR_VARIABLES);
    });

    it('resubscribes without variables when they become undefined', () => {
      const { rerender } = renderHook(
        ({ variables }: { variables?: object }) => createDataConsumptionHook<CaptionData>(
          DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
          { query: QUERY_WITH_ONE_VARIABLE, variables },
        ),
        { initialProps: { variables: EN_VARIABLES as object | undefined } },
      );

      rerender({ variables: undefined });

      expect(unsubscribeEvents).toHaveLength(1);
      expect(variablesOf(unsubscribeEvents[0])).toEqual(EN_VARIABLES);
      expect(subscribeEvents).toHaveLength(2);
      expect(variablesOf(subscribeEvents[1])).toBeUndefined();
    });

    it('does not resubscribe when a rerender passes a new variables object with the same content', () => {
      const { rerender } = renderCustomSubscriptionHook({ locale: 'en' });

      rerender({ variables: { locale: 'en' } });
      rerender({ variables: { locale: 'en' } });

      expect(subscribeEvents).toHaveLength(1);
      expect(unsubscribeEvents).toHaveLength(0);
    });

    it('does not resubscribe when a rerender passes the same variables in a different key order', () => {
      const { rerender } = renderHook(
        ({ variables }: { variables: object }) => createDataConsumptionHook<CaptionData>(
          DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
          { query: QUERY_WITH_TWO_VARIABLES, variables },
        ),
        { initialProps: { variables: { locale: 'en', since: '2026-01-01' } as object } },
      );

      rerender({ variables: { since: '2026-01-01', locale: 'en' } });

      expect(subscribeEvents).toHaveLength(1);
      expect(unsubscribeEvents).toHaveLength(0);
    });

    it('unsubscribes with the currently subscribed variables on unmount after a variables change', () => {
      const { rerender, unmount } = renderCustomSubscriptionHook(EN_VARIABLES);

      rerender({ variables: PT_BR_VARIABLES });
      unmount();

      const lastUnsubscribe = unsubscribeEvents[unsubscribeEvents.length - 1];
      expect(variablesOf(lastUnsubscribe)).toEqual(PT_BR_VARIABLES);
    });

    it('balances subscribes and unsubscribes per identifier across mount, change and unmount', () => {
      const { rerender, unmount } = renderCustomSubscriptionHook(EN_VARIABLES);

      rerender({ variables: PT_BR_VARIABLES });
      unmount();

      const balance = new Map<string, number>();
      subscribeEvents.forEach((event) => {
        const key = makeCustomHookIdentifierFromArgs(
          event.hookArguments as CustomSubscriptionArguments,
        );
        balance.set(key, (balance.get(key) ?? 0) + 1);
      });
      unsubscribeEvents.forEach((event) => {
        const key = makeCustomHookIdentifierFromArgs(
          event.hookArguments as CustomSubscriptionArguments,
        );
        balance.set(key, (balance.get(key) ?? 0) - 1);
      });

      balance.forEach((count, identifier) => {
        expect({ identifier, count }).toEqual({ identifier, count: 0 });
      });
    });
  });

  describe('custom subscription data delivery', () => {
    it('starts loading and applies data whose identifier matches the current subscription', () => {
      const { result } = renderCustomSubscriptionHook(EN_VARIABLES);

      expect(result.current).toEqual({ loading: true });

      const data = { caption_history: [{ captionText: 'hello' }] };
      sendData(
        DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
        { query: QUERY_WITH_ONE_VARIABLE, variables: EN_VARIABLES },
        { loading: false, data },
      );

      expect(result.current).toEqual({ loading: false, data });
    });

    it('ignores data whose identifier does not match the current subscription', () => {
      const { result } = renderCustomSubscriptionHook(EN_VARIABLES);

      sendData(
        DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
        { query: QUERY_WITH_ONE_VARIABLE, variables: PT_BR_VARIABLES },
        { loading: false, data: { caption_history: [] } },
      );

      expect(result.current).toEqual({ loading: true });
    });

    it('ignores data from other hooks', () => {
      const { result } = renderCustomSubscriptionHook(EN_VARIABLES);

      sendData(
        DataConsumptionHooks.LOADED_USER_LIST,
        undefined,
        { loading: false, data: { caption_history: [] } },
      );

      expect(result.current).toEqual({ loading: true });
    });

    it('stops applying data from the previous identifier after variables change', () => {
      const { result, rerender } = renderCustomSubscriptionHook(EN_VARIABLES);

      rerender({ variables: PT_BR_VARIABLES });

      sendData(
        DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
        { query: QUERY_WITH_ONE_VARIABLE, variables: EN_VARIABLES },
        { loading: false, data: { caption_history: [{ captionText: 'stale' }] } },
      );

      expect(result.current).toEqual({ loading: true });
    });

    it('applies data for the new identifier after variables change', () => {
      const { result, rerender } = renderCustomSubscriptionHook(EN_VARIABLES);

      rerender({ variables: PT_BR_VARIABLES });

      const data = { caption_history: [{ captionText: 'olá' }] };
      sendData(
        DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
        { query: QUERY_WITH_ONE_VARIABLE, variables: PT_BR_VARIABLES },
        { loading: false, data },
      );

      expect(result.current).toEqual({ loading: false, data });
    });

    it('matches identifiers regardless of variables key order', () => {
      const { result } = renderHook(() => createDataConsumptionHook<CaptionData>(
        DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
        { query: QUERY_WITH_TWO_VARIABLES, variables: { locale: 'en', since: '2026-01-01' } },
      ));

      const data = { caption_history: [] };
      sendData(
        DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
        { query: QUERY_WITH_TWO_VARIABLES, variables: { since: '2026-01-01', locale: 'en' } },
        { loading: false, data },
      );

      expect(result.current).toEqual({ loading: false, data });
    });
  });

  describe('multiple subscribers', () => {
    // Replicates how BBB core counts subscribers (plugins-engine
    // data-consumption manager): +1 per subscribe event and -1 per
    // unsubscribe event, keyed by the hook identifier. The subscription
    // container only exists in core while this count is greater than zero.
    const coreCountFor = (hookArguments: CustomSubscriptionArguments) => {
      const key = makeCustomHookIdentifierFromArgs(hookArguments);
      const countMatching = (
        events: (SubscribedEventDetails | UnsubscribedEventDetails)[],
      ) => events.filter((event) => event.hookArguments
        && makeCustomHookIdentifierFromArgs(
          event.hookArguments as CustomSubscriptionArguments,
        ) === key).length;
      return countMatching(subscribeEvents) - countMatching(unsubscribeEvents);
    };

    const EN_ARGUMENTS = { query: QUERY_WITH_ONE_VARIABLE, variables: EN_VARIABLES };
    const PT_BR_ARGUMENTS = { query: QUERY_WITH_ONE_VARIABLE, variables: PT_BR_VARIABLES };

    it('keeps the subscriber count correct while hooks of the same subscription mount and unmount', () => {
      const hookA = renderCustomSubscriptionHook(EN_VARIABLES);
      const hookB = renderCustomSubscriptionHook(EN_VARIABLES);

      expect(coreCountFor(EN_ARGUMENTS)).toBe(2);

      hookA.unmount();
      expect(coreCountFor(EN_ARGUMENTS)).toBe(1);

      hookB.unmount();
      expect(coreCountFor(EN_ARGUMENTS)).toBe(0);
    });

    it('delivers updates to every hook subscribed to the same subscription', () => {
      const hookA = renderCustomSubscriptionHook(EN_VARIABLES);
      const hookB = renderCustomSubscriptionHook(EN_VARIABLES);

      const data = { caption_history: [{ captionText: 'shared' }] };
      sendData(
        DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
        EN_ARGUMENTS,
        { loading: false, data },
      );

      expect(hookA.result.current).toEqual({ loading: false, data });
      expect(hookB.result.current).toEqual({ loading: false, data });
    });

    it('keeps delivering updates to the remaining hook after the other one unsubscribes', () => {
      const hookA = renderCustomSubscriptionHook(EN_VARIABLES);
      const hookB = renderCustomSubscriptionHook(EN_VARIABLES);

      hookA.unmount();
      expect(coreCountFor(EN_ARGUMENTS)).toBe(1);

      const data = { caption_history: [{ captionText: 'still here' }] };
      sendData(
        DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
        EN_ARGUMENTS,
        { loading: false, data },
      );

      expect(hookB.result.current).toEqual({ loading: false, data });
    });

    it('keeps different subscriptions independent from each other', () => {
      const hookEn = renderCustomSubscriptionHook(EN_VARIABLES);
      const hookPtBr = renderCustomSubscriptionHook(PT_BR_VARIABLES);

      expect(coreCountFor(EN_ARGUMENTS)).toBe(1);
      expect(coreCountFor(PT_BR_ARGUMENTS)).toBe(1);

      const enData = { caption_history: [{ captionText: 'hello' }] };
      sendData(
        DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
        EN_ARGUMENTS,
        { loading: false, data: enData },
      );

      expect(hookEn.result.current).toEqual({ loading: false, data: enData });
      expect(hookPtBr.result.current).toEqual({ loading: true });

      hookEn.unmount();
      expect(coreCountFor(EN_ARGUMENTS)).toBe(0);
      expect(coreCountFor(PT_BR_ARGUMENTS)).toBe(1);

      const ptBrData = { caption_history: [{ captionText: 'olá' }] };
      sendData(
        DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
        PT_BR_ARGUMENTS,
        { loading: false, data: ptBrData },
      );

      expect(hookPtBr.result.current).toEqual({ loading: false, data: ptBrData });
    });

    it('does not disturb a hook that keeps its subscription when another hook resubscribes away from it', () => {
      const hookA = renderCustomSubscriptionHook(EN_VARIABLES);
      const hookB = renderCustomSubscriptionHook(EN_VARIABLES);

      hookA.rerender({ variables: PT_BR_VARIABLES });

      expect(coreCountFor(EN_ARGUMENTS)).toBe(1);
      expect(coreCountFor(PT_BR_ARGUMENTS)).toBe(1);

      const enData = { caption_history: [{ captionText: 'for B' }] };
      sendData(
        DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
        EN_ARGUMENTS,
        { loading: false, data: enData },
      );

      expect(hookB.result.current).toEqual({ loading: false, data: enData });
      expect(hookA.result.current).toEqual({ loading: true });

      const ptBrData = { caption_history: [{ captionText: 'for A' }] };
      sendData(
        DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
        PT_BR_ARGUMENTS,
        { loading: false, data: ptBrData },
      );

      expect(hookA.result.current).toEqual({ loading: false, data: ptBrData });

      hookA.unmount();
      expect(coreCountFor(EN_ARGUMENTS)).toBe(1);
      expect(coreCountFor(PT_BR_ARGUMENTS)).toBe(0);

      const laterEnData = { caption_history: [{ captionText: 'B keeps receiving' }] };
      sendData(
        DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
        EN_ARGUMENTS,
        { loading: false, data: laterEnData },
      );

      expect(hookB.result.current).toEqual({ loading: false, data: laterEnData });
    });
  });

  describe('resubscribing after full unsubscribe (bigbluebutton/bigbluebutton#23814)', () => {
    // The regression in https://github.com/bigbluebutton/bigbluebutton-html-plugin-sdk/issues/23814
    // was a new subscriber staying empty after the
    // subscription count cycled back to a previous value (1 -> 0 -> 1). On
    // the SDK side, the protection relies on the hook dispatching a fresh
    // subscribe event on every mount and on its data listener being
    // registered BEFORE the subscribe is dispatched.
    it('receives data the core already holds as soon as it subscribes', () => {
      const data = { caption_history: [{ captionText: 'existing' }] };
      respondToSubscribesWith({ loading: false, data });

      const { result } = renderCustomSubscriptionHook(EN_VARIABLES);

      expect(result.current).toEqual({ loading: false, data });
    });

    it('delivers data again to a subscriber that mounts after the previous one left', () => {
      const data = { caption_history: [{ captionText: 'persisted' }] };
      respondToSubscribesWith({ loading: false, data });

      const hookA = renderCustomSubscriptionHook(EN_VARIABLES);
      expect(hookA.result.current).toEqual({ loading: false, data });
      hookA.unmount();

      const hookB = renderCustomSubscriptionHook(EN_VARIABLES);

      expect(hookB.result.current).toEqual({ loading: false, data });
      // Each mount must emit its own subscribe event: it is what lets the
      // core bump the container version and re-dispatch the current data.
      expect(subscribeEvents).toHaveLength(2);
    });

    it('delivers data again on remount for hooks without arguments as well', () => {
      const data = { users: [{ name: 'someone' }] };
      respondToSubscribesWith({ loading: false, data });

      const hookA = renderHook(
        () => createDataConsumptionHook<object>(DataConsumptionHooks.LOADED_USER_LIST),
      );
      expect(hookA.result.current).toEqual({ loading: false, data });
      hookA.unmount();

      const hookB = renderHook(
        () => createDataConsumptionHook<object>(DataConsumptionHooks.LOADED_USER_LIST),
      );

      expect(hookB.result.current).toEqual({ loading: false, data });
      expect(subscribeEvents).toHaveLength(2);
    });
  });

  describe('stable loading state with shared subscriptions (plugin-sdk#251)', () => {
    // In https://github.com/bigbluebutton/bigbluebutton-html-plugin-sdk/issues/251,
    // two components using useCustomSubscription with the same
    // query made `loading` toggle indefinitely. The core fix
    // (bigbluebutton/bigbluebutton#24815) only re-dispatches data when its
    // version actually changes; on the SDK side, these tests lock that
    // re-dispatched unchanged data is applied idempotently and that a new
    // subscriber never destabilizes the state of one already resolved.
    it('does not change state when the core re-dispatches unchanged data', () => {
      const { result } = renderCustomSubscriptionHook(EN_VARIABLES);

      const data = { caption_history: [{ captionText: 'stable' }] };
      sendData(
        DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
        { query: QUERY_WITH_ONE_VARIABLE, variables: EN_VARIABLES },
        { loading: false, data },
      );
      expect(result.current).toEqual({ loading: false, data });

      sendData(
        DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
        { query: QUERY_WITH_ONE_VARIABLE, variables: EN_VARIABLES },
        { loading: false, data: { caption_history: [{ captionText: 'stable' }] } },
      );

      expect(result.current).toEqual({ loading: false, data });
    });

    it('keeps loading false on a resolved hook when another component subscribes to the same subscription', () => {
      const data = { caption_history: [{ captionText: 'shared' }] };
      respondToSubscribesWith({ loading: false, data });

      const hookA = renderCustomSubscriptionHook(EN_VARIABLES);
      expect(hookA.result.current).toEqual({ loading: false, data });

      const hookB = renderCustomSubscriptionHook(EN_VARIABLES);

      expect(hookA.result.current).toEqual({ loading: false, data });
      expect(hookB.result.current).toEqual({ loading: false, data });
    });

    it('keeps both hooks stable across rerenders after data resolved', () => {
      const data = { caption_history: [{ captionText: 'settled' }] };
      respondToSubscribesWith({ loading: false, data });

      const hookA = renderCustomSubscriptionHook(EN_VARIABLES);
      const hookB = renderCustomSubscriptionHook(EN_VARIABLES);

      hookA.rerender({ variables: { locale: 'en' } });
      hookB.rerender({ variables: { locale: 'en' } });
      hookA.rerender({ variables: { locale: 'en' } });

      expect(hookA.result.current).toEqual({ loading: false, data });
      expect(hookB.result.current).toEqual({ loading: false, data });
      expect(subscribeEvents).toHaveLength(2);
      expect(unsubscribeEvents).toHaveLength(0);
    });
  });

  describe('hooks without arguments', () => {
    it('subscribes on mount and unsubscribes on unmount for the same hook', () => {
      const { unmount } = renderHook(
        () => createDataConsumptionHook<object>(DataConsumptionHooks.LOADED_USER_LIST),
      );

      expect(subscribeEvents).toHaveLength(1);
      expect(subscribeEvents[0].hook).toBe(DataConsumptionHooks.LOADED_USER_LIST);

      unmount();

      expect(unsubscribeEvents).toHaveLength(1);
      expect(unsubscribeEvents[0].hook).toBe(DataConsumptionHooks.LOADED_USER_LIST);
    });

    it('applies data based on hook name alone', () => {
      const { result } = renderHook(
        () => createDataConsumptionHook<object>(DataConsumptionHooks.LOADED_USER_LIST),
      );

      const data = { users: [] };
      sendData(DataConsumptionHooks.LOADED_USER_LIST, undefined, { loading: false, data });

      expect(result.current).toEqual({ loading: false, data });
    });
  });

  describe('custom query', () => {
    it('subscribes with the initial arguments on mount', () => {
      renderCustomQueryHook(EN_VARIABLES);

      expect(subscribeEvents).toHaveLength(1);
      expect(subscribeEvents[0].hook).toBe(DataConsumptionHooks.CUSTOM_QUERY);
      expect(subscribeEvents[0].hookArguments).toEqual({
        query: QUERY_WITH_ONE_VARIABLE,
        variables: EN_VARIABLES,
      });
    });

    it('starts loading and applies data whose identifier matches the query arguments', () => {
      const { result } = renderCustomQueryHook(EN_VARIABLES);

      expect(result.current).toEqual({ loading: true });

      const data = { caption_history: [{ captionText: 'hello' }] };
      sendData(
        DataConsumptionHooks.CUSTOM_QUERY,
        { query: QUERY_WITH_ONE_VARIABLE, variables: EN_VARIABLES },
        { loading: false, data },
      );

      expect(result.current).toEqual({ loading: false, data });
    });

    it('ignores data whose identifier does not match the query arguments', () => {
      const { result } = renderCustomQueryHook(EN_VARIABLES);

      sendData(
        DataConsumptionHooks.CUSTOM_QUERY,
        { query: QUERY_WITH_ONE_VARIABLE, variables: PT_BR_VARIABLES },
        { loading: false, data: { caption_history: [] } },
      );

      expect(result.current).toEqual({ loading: true });
    });

    it('ignores data from a custom subscription with the same arguments', () => {
      const { result } = renderCustomQueryHook(EN_VARIABLES);

      sendData(
        DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
        { query: QUERY_WITH_ONE_VARIABLE, variables: EN_VARIABLES },
        { loading: false, data: { caption_history: [] } },
      );

      expect(result.current).toEqual({ loading: true });
    });

    it('keeps resolving with the mount arguments after variables change', () => {
      const { result, rerender } = renderCustomQueryHook(EN_VARIABLES);

      rerender({ variables: PT_BR_VARIABLES });

      const data = { caption_history: [{ captionText: 'hello' }] };
      sendData(
        DataConsumptionHooks.CUSTOM_QUERY,
        { query: QUERY_WITH_ONE_VARIABLE, variables: EN_VARIABLES },
        { loading: false, data },
      );

      expect(result.current).toEqual({ loading: false, data });
    });

    it('does not resubscribe when variables change and unsubscribes the original identifier on unmount', () => {
      const { rerender, unmount } = renderCustomQueryHook(EN_VARIABLES);

      rerender({ variables: PT_BR_VARIABLES });

      expect(subscribeEvents).toHaveLength(1);
      expect(unsubscribeEvents).toHaveLength(0);

      unmount();

      expect(unsubscribeEvents).toHaveLength(1);
      expect(variablesOf(unsubscribeEvents[0])).toEqual(EN_VARIABLES);
    });
  });
});
