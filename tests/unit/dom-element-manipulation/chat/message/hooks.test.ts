import {
  describe, it, expect, vi,
} from 'vitest';
import { renderHook, act } from '@testing-library/react';

import { useChatMessageDomElements } from '../../../../../src/dom-element-manipulation/chat/message/hooks';
import { HookEvents } from '../../../../../src/core/enum';
import { DomElementManipulationHooks } from '../../../../../src/dom-element-manipulation/enums';

const PLUGIN_UUID = 'plugin-uuid';

const makeMessageElement = (messageId: string) => {
  const element = document.createElement('div');
  element.setAttribute('data-chat-message-id', messageId);
  return element;
};

const sendPage = (page: number, elements: HTMLDivElement[]) => {
  act(() => {
    window.dispatchEvent(new CustomEvent(HookEvents.BBB_CORE_SENT_NEW_DATA, {
      detail: {
        hook: DomElementManipulationHooks.CHAT_MESSAGE,
        data: {
          page,
          messages: elements.map((message) => ({
            messageId: message.getAttribute('data-chat-message-id'),
            message,
          })),
        },
      },
    }));
  });
};

const renderChatMessageHook = (initialMessageIds: string[]) => renderHook(
  ({ messageIds }) => useChatMessageDomElements(messageIds, PLUGIN_UUID),
  { initialProps: { messageIds: initialMessageIds } },
);

describe('useChatMessageDomElements', () => {
  it('returns the elements sent for the requested ids', () => {
    const a = makeMessageElement('a');
    const b = makeMessageElement('b');
    const { result } = renderChatMessageHook(['a', 'b']);

    sendPage(0, [a, b]);

    expect(result.current).toEqual([a, b]);
  });

  it('drops an element the client stops sending while the id is still requested', () => {
    const a = makeMessageElement('a');
    const b = makeMessageElement('b');
    const { result } = renderChatMessageHook(['a', 'b']);

    sendPage(0, [a, b]);
    sendPage(0, [a]);

    expect(result.current).toEqual([a]);
  });

  it('empties a mounted page that renders none of the requested ids, keeping other pages', () => {
    const a = makeMessageElement('a');
    const b = makeMessageElement('b');
    const { result } = renderChatMessageHook(['a', 'b']);

    sendPage(0, [a]);
    sendPage(1, [b]);
    sendPage(0, []);

    expect(result.current).toEqual([b]);
  });

  it('stores only the elements this plugin requested', () => {
    const a = makeMessageElement('a');
    const c = makeMessageElement('c');
    const { result, rerender } = renderChatMessageHook(['a']);

    sendPage(0, [a, c]);
    rerender({ messageIds: ['a', 'c'] });

    expect(result.current).toEqual([a]);
  });

  it('stops listening for data after unmounting', () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderChatMessageHook(['a']);

    unmount();

    const listenersFor = (spy: typeof addSpy) => spy.mock.calls
      .filter(([eventName]) => eventName === HookEvents.BBB_CORE_SENT_NEW_DATA)
      .map(([, listener]) => listener);
    const removedListeners = listenersFor(removeSpy);
    expect(listenersFor(addSpy).every((listener) => removedListeners.includes(listener)))
      .toBe(true);
  });
});
