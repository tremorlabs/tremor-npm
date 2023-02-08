import {
  BaseColors,
  DeltaTypes,
  Sizing,
  fontSize,
  getColor,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
} from "lib";

import {
  ArrowDownIcon,
  ArrowDownRightIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
} from "assets";

export type BadgeProportionTypes = {
  paddingX: string;
  paddingY: string;
  fontSize: string;
};

export const badgeProportionsIconOnly: {
  [char: string]: BadgeProportionTypes;
} = {
  xs: {
    paddingX: spacing.sm.paddingX,
    paddingY: spacing.threeXs.paddingY,
    fontSize: fontSize.xs,
  },
  sm: {
    paddingX: spacing.md.paddingX,
    paddingY: spacing.twoXs.paddingY,
    fontSize: fontSize.sm,
  },
  md: {
    paddingX: spacing.lg.paddingX,
    paddingY: spacing.xs.paddingY,
    fontSize: fontSize.md,
  },
  lg: {
    paddingX: spacing.xl.paddingX,
    paddingY: spacing.xs.paddingY,
    fontSize: fontSize.lg,
  },
  xl: {
    paddingX: spacing.xl.paddingX,
    paddingY: spacing.xs.paddingY,
    fontSize: fontSize.xl,
  },
};

export const badgeProportionsWithText: {
  [char: string]: BadgeProportionTypes;
} = {
  xs: {
    paddingX: spacing.sm.paddingX,
    paddingY: spacing.threeXs.paddingY,
    fontSize: fontSize.xs,
  },
  sm: {
    paddingX: spacing.md.paddingX,
    paddingY: spacing.threeXs.paddingY,
    fontSize: fontSize.sm,
  },
  md: {
    paddingX: spacing.lg.paddingX,
    paddingY: spacing.threeXs.paddingY,
    fontSize: fontSize.md,
  },
  lg: {
    paddingX: spacing.xl.paddingX,
    paddingY: spacing.threeXs.paddingY,
    fontSize: fontSize.lg,
  },
  xl: {
    paddingX: spacing.twoXl.paddingX,
    paddingY: spacing.twoXs.paddingY,
    fontSize: fontSize.xl,
  },
};

export const iconSizes: { [size: string]: Sizing } = {
  xs: {
    height: sizing.md.height,
    width: sizing.md.width,
  },
  sm: {
    height: sizing.md.height,
    width: sizing.md.width,
  },
  md: {
    height: sizing.md.height,
    width: sizing.md.width,
  },
  lg: {
    height: sizing.lg.height,
    width: sizing.lg.width,
  },
  xl: {
    height: sizing.xl.height,
    width: sizing.xl.width,
  },
};

export type ColorTypes = {
  bgColor: string;
  textColor: string;
};

export const colors: { [key: string]: ColorTypes } = {
  [DeltaTypes.Increase]: {
    bgColor: getColorVariantsFromColorThemeValue(getColor(BaseColors.Emerald).lightBackground)
      .bgColor,
    textColor: getColorVariantsFromColorThemeValue(getColor(BaseColors.Emerald).darkText).textColor,
  },
  [DeltaTypes.ModerateIncrease]: {
    bgColor: getColorVariantsFromColorThemeValue(getColor(BaseColors.Emerald).lightBackground)
      .bgColor,
    textColor: getColorVariantsFromColorThemeValue(getColor(BaseColors.Emerald).darkText).textColor,
  },
  [DeltaTypes.Decrease]: {
    bgColor: getColorVariantsFromColorThemeValue(getColor(BaseColors.Rose).lightBackground).bgColor,
    textColor: getColorVariantsFromColorThemeValue(getColor(BaseColors.Rose).darkText).textColor,
  },
  [DeltaTypes.ModerateDecrease]: {
    bgColor: getColorVariantsFromColorThemeValue(getColor(BaseColors.Rose).lightBackground).bgColor,
    textColor: getColorVariantsFromColorThemeValue(getColor(BaseColors.Rose).darkText).textColor,
  },
  [DeltaTypes.Unchanged]: {
    bgColor: getColorVariantsFromColorThemeValue(getColor(BaseColors.Orange).lightBackground)
      .bgColor,
    textColor: getColorVariantsFromColorThemeValue(getColor(BaseColors.Orange).darkText).textColor,
  },
};

export const deltaIcons: { [key: string]: React.ElementType } = {
  [DeltaTypes.Increase]: ArrowUpIcon,
  [DeltaTypes.ModerateIncrease]: ArrowUpRightIcon,
  [DeltaTypes.Decrease]: ArrowDownIcon,
  [DeltaTypes.ModerateDecrease]: ArrowDownRightIcon,
  [DeltaTypes.Unchanged]: ArrowRightIcon,
};
