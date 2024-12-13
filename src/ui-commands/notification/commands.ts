import { NotificationEnum } from './enums';
import { SendNotificationCommandArguments, SetEnableDisplayNotificationsArguments } from './types';

export const notification = {
  /**
   * Sends notification to be rendered in the front-end.
   */
  send: (information: SendNotificationCommandArguments) => {
    window.dispatchEvent(
      new CustomEvent<
        SendNotificationCommandArguments
      >(NotificationEnum.SEND, {
        detail: information,
      }),
    );
  },
  /**
   * Decides if notifications stop being displayed.
   */
  setEnabledDisplayNotifications: (isNotificationDisplayEnabled: boolean) => {
    window.dispatchEvent(
      new CustomEvent<
        SetEnableDisplayNotificationsArguments
      >(NotificationEnum.SET_ENABLED_DISPLAY, {
        detail: { isNotificationDisplayEnabled },
      }),
    );
  },
};
