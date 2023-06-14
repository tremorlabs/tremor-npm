import { BaseColors, DeltaTypes, getColorClassNames } from "lib";
import { colorPalette } from "lib/theme";

export type ColorTypes = {
  bgColor: string;
};

export const colors: { [key: string]: ColorTypes } = {
  [DeltaTypes.Increase]: {
    bgColor: getColorClassNames(BaseColors.Emerald, colorPalette.background).bgColor,
  },
  [DeltaTypes.ModerateIncrease]: {
    bgColor: getColorClassNames(BaseColors.Emerald, colorPalette.background).bgColor,
  },
  [DeltaTypes.Decrease]: {
    bgColor: getColorClassNames(BaseColors.Rose, colorPalette.background).bgColor,
  },
  [DeltaTypes.ModerateDecrease]: {
    bgColor: getColorClassNames(BaseColors.Rose, colorPalette.background).bgColor,
  },
  [DeltaTypes.Unchanged]: {
    bgColor: getColorClassNames(BaseColors.Orange, colorPalette.background).bgColor,
  },
};
