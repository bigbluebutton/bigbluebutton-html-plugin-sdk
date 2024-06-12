import * as ReactDOM from 'react-dom/client';
import * as React from 'react';
import { useEffect, useState } from 'react';

import {
  FloatingWindow,
  PluginApi,
  BbbPluginSdk,
  ActionsBarInterface,
  ActionsBarButton,
  ActionsBarPosition,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleFloatingWindowPluginProps } from './types';
import StickyNote from '../floating-personal-notes/component';
import enums from '../utils/events';

function SampleFloatingWindowPlugin(
  { pluginUuid: uuid }: SampleFloatingWindowPluginProps,
): React.ReactElement {
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const [textContent, setTextContent] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const handleMinimizeWindow: EventListener = (
    (event: CustomEvent) => {
      setTextContent(event.detail.textContent);
      setIsMinimized(true);
    }) as EventListener;

  const handleCloseWindow: EventListener = (
    () => {
      setIsClosed(true);
    }) as EventListener;
console.log("sss")
  useEffect(() => {
    if (!isMinimized && !isClosed) {
      const floatingWindow = new FloatingWindow({
        top: 50,
        left: 50,
        movable: true,
        backgroundColor: '#f1f1f1',
        boxShadow: '2px 2px 10px #777',
        contentFunction: (element: HTMLElement) => {
          const root = ReactDOM.createRoot(element);
          root.render(
            <React.StrictMode>
              <StickyNote
                initialTextContent={textContent}
                initialTitle="Personal notes (not saved)"
              />
            </React.StrictMode>,
          );
        },
      });
      pluginApi.setActionsBarItems([]);
      pluginApi.setFloatingWindows([floatingWindow]);
    } else if (isMinimized && !isClosed) {
      const restoringButton: ActionsBarInterface = new ActionsBarButton({
        icon: 'copy',
        tooltip: 'Open private notes floating window',
        onClick: () => {
          setIsMinimized(false);
        },
        position: ActionsBarPosition.RIGHT,
      });
      pluginApi.setFloatingWindows([]);
      pluginApi.setActionsBarItems([restoringButton]);
    } else {
      pluginApi.setFloatingWindows([]);
      pluginApi.setActionsBarItems([]);
    }
  }, [isMinimized, isClosed]);

  useEffect(() => {
    window.addEventListener(enums.SampleFloatingWindow.MINIMIZE_WINDOW, handleMinimizeWindow);
    window.addEventListener(enums.SampleFloatingWindow.CLOSE_WINDOW, handleCloseWindow);
    return () => {
      window.removeEventListener(enums.SampleFloatingWindow.MINIMIZE_WINDOW, handleMinimizeWindow);
      window.removeEventListener(enums.SampleFloatingWindow.CLOSE_WINDOW, handleCloseWindow);
    };
  }, []);

  return null;
}

export default SampleFloatingWindowPlugin;
