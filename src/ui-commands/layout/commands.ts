import { LayoutCommandsEnum, LayoutComponentListEnum } from './enums';

export const layout = {
  set: (layoutToBeSet: LayoutComponentListEnum) => {
    window.dispatchEvent(new CustomEvent<LayoutComponentListEnum>(LayoutCommandsEnum.SET, {
      detail: layoutToBeSet,
    }));
  },
  unset: (layoutToBeSet: LayoutComponentListEnum) => {
    window.dispatchEvent(new CustomEvent<LayoutComponentListEnum>(LayoutCommandsEnum.UNSET, {
      detail: layoutToBeSet,
    }));
  },
};
