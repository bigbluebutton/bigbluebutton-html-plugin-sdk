import { Internal } from '../enums';
import { FillingDataForm } from './types';

const form = {
  open: () => {
    window.dispatchEvent(new Event(Internal.UiCommandsEvents.Poll.Open));
  },

  fill: (data: FillingDataForm) => {
    window.dispatchEvent(new CustomEvent(Internal.UiCommandsEvents.Poll.Fill, {
      detail: { hook: Internal.UiCommandsEvents.Poll.Fill, data },
    }));
  },
};

export const pollCreation = {
  form,
};
