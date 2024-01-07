import { spacing } from "lib/spacing";

export type BadgeProportionTypes = {
  paddingX: string;
  paddingY: string;
  fontSize: string;
};

export const badgeProportions: { [char: string]: BadgeProportionTypes } = {
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
