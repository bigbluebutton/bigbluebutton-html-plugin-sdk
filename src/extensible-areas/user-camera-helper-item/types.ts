import { PluginProvidedUiItemDescriptor } from '../base';
import { UserCameraHelperItemPosition } from './enums';

export interface UserCameraHelperInterface extends PluginProvidedUiItemDescriptor{
  position: UserCameraHelperItemPosition;
}

export interface UserCameraHelperButtonOnclickCallback {
  browserClickEvent: React.MouseEvent<HTMLElement>;
}

export interface UserCameraHelperCallbackFunctionArguments {
  streamId: string;
  userId: string;
}

export interface UserCameraHelperButtonInterface extends UserCameraHelperInterface{
  label: string;

  icon: string;

  tooltip: string;

  disabled: boolean;

  position: UserCameraHelperItemPosition;

  displayFunction?: (args: UserCameraHelperCallbackFunctionArguments) => boolean;

  onClick: (args: UserCameraHelperButtonOnclickCallback) => void;
}

export interface UserCameraHelperButtonProps {
  label?: string;
  icon: string;
  tooltip: string;
  disabled: boolean;
  displayFunction?: (args: UserCameraHelperCallbackFunctionArguments) => boolean;
  position: UserCameraHelperItemPosition;
  onClick: (args: UserCameraHelperButtonOnclickCallback) => void;
}
