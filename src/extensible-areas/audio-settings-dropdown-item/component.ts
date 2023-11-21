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

  constructor() {
    this.type = AudioSettingsDropdownItemType.SEPARATOR;
  }

  setItemId: (id: string) => void = (id: string) => {
    this.id = `AudioSettingsDropdownSeparator_${id}`;
  };
}
