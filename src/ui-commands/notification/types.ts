import { NotificationTypeUiCommand } from './enums';

export interface SendNotificationCommandArgumentsOptions {
  helpLabel?: string,
  helpLink?: string,
  autoClose?: number, // Time, in milliseconds, to auto-close the notification
}

export interface SendNotificationCommandArguments {
  message: string;
  icon: string;
  type: NotificationTypeUiCommand;
  options?: SendNotificationCommandArgumentsOptions;
  content?: string;
  small?: boolean;
}

export interface UiCommandsNotificationObject {
  send: (information: SendNotificationCommandArguments) => void;
}
