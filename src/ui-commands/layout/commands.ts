import { LayoutEnum, EnforcedLayoutTypeEnum } from './enums';
import { ChangeEnforcedLayout, ChangeEnforcedLayoutCommandArguments, SetEnforcedLayoutCommandArguments } from './types';

export const layout = {
  /**
   * @deprecated Use {@link layout.setEnforcedLayout} instead
   * Changes the enforced layout
   *
   * @param layoutType is one of the options described by the enum
   */
  changeEnforcedLayout: ((layoutType: EnforcedLayoutTypeEnum) => {
    window.dispatchEvent(
      new CustomEvent<
        ChangeEnforcedLayoutCommandArguments
      >(LayoutEnum.CHANGE_ENFORCED_LAYOUT, {
        detail: {
          layoutType,
        },
      }),
    );
  }) as ChangeEnforcedLayout,

  /**
   * Sets the enforced layout
   *
   * @param layoutType is one of the options described by the enum
   */
  setEnforcedLayout: ((layoutType: EnforcedLayoutTypeEnum) => {
    window.dispatchEvent(
      new CustomEvent<
        SetEnforcedLayoutCommandArguments
      >(LayoutEnum.SET_ENFORCED_LAYOUT, {
        detail: {
          layoutType,
        },
      }),
    );
  }),
};
