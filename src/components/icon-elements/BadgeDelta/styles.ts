import { BaseColors, DeltaTypes, getColorClassNames, spacing } from "lib";

import {
  ArrowDownIcon,
  ArrowDownRightIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
} from "assets";
import { colorPalette } from "lib/theme";

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
    fontSize: "text-xs",
  },
  sm: {
    paddingX: spacing.md.paddingX,
    paddingY: spacing.twoXs.paddingY,
    fontSize: "text-sm",
  },
  md: {
    paddingX: spacing.lg.paddingX,
    paddingY: spacing.xs.paddingY,
    fontSize: "text-md",
  },
  lg: {
    paddingX: spacing.xl.paddingX,
    paddingY: spacing.xs.paddingY,
    fontSize: "text-lg",
  },
  xl: {
    paddingX: spacing.xl.paddingX,
    paddingY: spacing.xs.paddingY,
    fontSize: "text-xl",
  },
};

export const badgeProportionsWithText: {
  [char: string]: BadgeProportionTypes;
} = {
  xs: {
    paddingX: spacing.sm.paddingX,
    paddingY: spacing.threeXs.paddingY,
    fontSize: "text-xs",
  },
  sm: {
    paddingX: spacing.md.paddingX,
    paddingY: spacing.threeXs.paddingY,
    fontSize: "text-sm",
  },
  md: {
    paddingX: spacing.lg.paddingX,
    paddingY: spacing.threeXs.paddingY,
    fontSize: "text-md",
  },
  lg: {
    paddingX: spacing.xl.paddingX,
    paddingY: spacing.threeXs.paddingY,
    fontSize: "text-lg",
  },
  xl: {
    paddingX: spacing.twoXl.paddingX,
    paddingY: spacing.twoXs.paddingY,
    fontSize: "text-xl",
  },
};

export const iconSizes: {
  [size: string]: {
    height: string;
    width: string;
  };
} = {
  xs: {
    height: "h-4",
    width: "w-4",
  },
  sm: {
    height: "h-4",
    width: "w-4",
  },
  md: {
    height: "h-4",
    width: "w-4",
  },
  lg: {
    height: "h-5",
    width: "w-5",
  },
  xl: {
    height: "h-6",
    width: "w-6",
  },
};

export type ColorTypes = {
  bgColor: string;
  textColor: string;
};

export const colors: { [key: string]: ColorTypes } = {
  [DeltaTypes.Increase]: {
    bgColor: getColorClassNames(BaseColors.Emerald, colorPalette.background).bgColor,
    textColor: getColorClassNames(BaseColors.Emerald, colorPalette.text).textColor,
  },
  [DeltaTypes.ModerateIncrease]: {
    bgColor: getColorClassNames(BaseColors.Emerald, colorPalette.background).bgColor,
    textColor: getColorClassNames(BaseColors.Emerald, colorPalette.text).textColor,
  },
  [DeltaTypes.Decrease]: {
    bgColor: getColorClassNames(BaseColors.Rose, colorPalette.background).bgColor,
    textColor: getColorClassNames(BaseColors.Rose, colorPalette.text).textColor,
  },
  [DeltaTypes.ModerateDecrease]: {
    bgColor: getColorClassNames(BaseColors.Rose, colorPalette.background).bgColor,
    textColor: getColorClassNames(BaseColors.Rose, colorPalette.text).textColor,
  },
  [DeltaTypes.Unchanged]: {
    bgColor: getColorClassNames(BaseColors.Orange, colorPalette.background).bgColor,
    textColor: getColorClassNames(BaseColors.Orange, colorPalette.text).textColor,
  },
};

export const deltaIcons: { [key: string]: React.ElementType } = {
  [DeltaTypes.Increase]: ArrowUpIcon,
  [DeltaTypes.ModerateIncrease]: ArrowUpRightIcon,
  [DeltaTypes.Decrease]: ArrowDownIcon,
  [DeltaTypes.ModerateDecrease]: ArrowDownRightIcon,
  [DeltaTypes.Unchanged]: ArrowRightIcon,
};
