import { NotificationEnum } from './enums';
import { SendNotificationCommandArguments } from './types';

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
};
