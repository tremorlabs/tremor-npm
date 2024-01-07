import { Sizing, sizing } from "lib/sizing";
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
