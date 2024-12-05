import { ChangeEnforcedLayoutTypeEnum, LayoutEnum } from './enums';
import { ChangeEnforcedLayout, ChangeEnforcedLayoutCommandArguments } from './types';

export const layout = {
  /**
   * <description>
   *
   * @param
   */
  changeEnforcedLayout: ((layoutType: ChangeEnforcedLayoutTypeEnum) => {
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
};
