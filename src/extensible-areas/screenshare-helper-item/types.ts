import { PluginProvidedUiItemDescriptor } from '../base';
import { ScreenshareHelperItemPosition } from './enums';

export interface ScreenshareHelperInterface extends PluginProvidedUiItemDescriptor{
  position: ScreenshareHelperItemPosition;
}

export interface ScreenshareHelperButtonOnclickCallback {
  browserClickEvent: React.MouseEvent<HTMLElement>;
}

export interface ScreenshareHelperButtonInterface extends ScreenshareHelperInterface{
  label: string;

  icon: string;

  tooltip: string;

  disabled: boolean;

  position: ScreenshareHelperItemPosition;

  onClick: (args: ScreenshareHelperButtonOnclickCallback) => void;
}

export interface ScreenshareHelperButtonProps {
  label?: string;
  icon: string;
  tooltip: string;
  disabled: boolean;
  hasSeparator: boolean;
  position: ScreenshareHelperItemPosition;
  onClick: (args: ScreenshareHelperButtonOnclickCallback) => void;
}
