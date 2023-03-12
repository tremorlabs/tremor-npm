import { BaseColors, DeltaTypes, colorClassNames } from "lib";
import { colorPalette } from "lib/theme";

export type ColorTypes = {
  bgColor: string;
};

export const colors: { [key: string]: ColorTypes } = {
  [DeltaTypes.Increase]: {
    bgColor: colorClassNames[BaseColors.Emerald][colorPalette.background].bgColor,
  },
  [DeltaTypes.ModerateIncrease]: {
    bgColor: colorClassNames[BaseColors.Emerald][colorPalette.background].bgColor,
  },
  [DeltaTypes.Decrease]: {
    bgColor: colorClassNames[BaseColors.Rose][colorPalette.background].bgColor,
  },
  [DeltaTypes.ModerateDecrease]: {
    bgColor: colorClassNames[BaseColors.Rose][colorPalette.background].bgColor,
  },
  [DeltaTypes.Unchanged]: {
    bgColor: colorClassNames[BaseColors.Orange][colorPalette.background].bgColor,
  },
};
