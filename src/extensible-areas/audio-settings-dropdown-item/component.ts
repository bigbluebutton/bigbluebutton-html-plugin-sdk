import { AudioSettingsDropdownItemType } from './enums';
import {
  AudioSettingsDropdownItem, AudioSettingsDropdownOptionProps,
} from './types';

// AudioSettingsDropdownItem Extensible Area

export class AudioSettingsDropdownOption implements AudioSettingsDropdownItem {
  id: string = '';

  type: AudioSettingsDropdownItemType;

  label: string;

  icon: string;

  onClick: () => void;

  /**
   * Returns object to be used in the setter for the audio settings dropdown. In this case,
   * an option.
   *
   * @param label - label to be displayed in audio settings dropdown option
   * @param icon - icon to be used in the option for the dropdown. It goes in the left side of it
   * @param onClick - function to be called when clicking the button
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5)
   */
  constructor({
    label = '', icon = '', onClick = () => {},
  }: AudioSettingsDropdownOptionProps) {
    this.label = label;
    this.icon = icon;
    this.onClick = onClick;
    this.type = AudioSettingsDropdownItemType.OPTION;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `AudioSettingsDropdownOption_${id}`;
  };
}

export class AudioSettingsDropdownSeparator implements AudioSettingsDropdownItem {
  id: string = '';

  type: AudioSettingsDropdownItemType;

  /**
   * Returns object to be used in the setter for the audio settings dropdown. In this case,
   * a separator.
   *
   * @remarks
   * It will display a horizontal thin black line inside the dropdown.
   *
   * @returns Object that will be interpreted by the core of Bigbluebutton (HTML5)
   */
  constructor() {
    this.type = AudioSettingsDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `AudioSettingsDropdownSeparator_${id}`;
  };
}
