import { NotificationEnum } from './enums';
import { SendNotificationCommandArguments, SetDisplayNotificationsArguments } from './types';

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
  setDisplayNotifications: (isNotificationDisplaying: boolean) => {
    window.dispatchEvent(
      new CustomEvent<
        SetDisplayNotificationsArguments
      >(NotificationEnum.SET_DISPLAY, {
        detail: { isNotificationDisplaying },
      }),
    );
  },
};
