import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import { camera } from '../../../../src/ui-commands/camera/commands';
import { CameraEnum } from '../../../../src/ui-commands/camera/enums';
import { SetCameraFocusCommandArguments } from '../../../../src/ui-commands/camera/types';

describe('camera commands', () => {
  const events: { type: string; detail: SetCameraFocusCommandArguments }[] = [];
  const listener: EventListener = ((event: CustomEvent<SetCameraFocusCommandArguments>) => {
    events.push({ type: event.type, detail: event.detail });
  }) as EventListener;

  beforeEach(() => {
    events.length = 0;
    window.addEventListener(CameraEnum.SET_CAMERA_FOCUS, listener);
  });

  afterEach(() => {
    window.removeEventListener(CameraEnum.SET_CAMERA_FOCUS, listener);
  });

  it.each([
    { focus: true, webcamSelector: [{ userId: 'user-1' }] },
    { focus: true, webcamSelector: [{ streamId: 'stream-1' }] },
    { focus: false, webcamSelector: [{ userId: 'user-1' }] },
  ] satisfies SetCameraFocusCommandArguments[])(
    'dispatches SET_CAMERA_FOCUS with $webcamSelector and focus $focus',
    (arguments_) => {
      camera.setCameraFocus(arguments_);

      expect(events).toEqual([{
        type: CameraEnum.SET_CAMERA_FOCUS,
        detail: arguments_,
      }]);
    },
  );
});
