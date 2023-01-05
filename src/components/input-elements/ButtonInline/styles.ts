import { Sizing, sizing } from "lib/sizing";
import { fontSize } from "lib/font";

export type ButtonProportionTypes = {
  fontSize: string;
};

export const buttonProportions: { [size: string]: ButtonProportionTypes } = {
  xs: {
    fontSize: fontSize.xs,
  },
  sm: {
    fontSize: fontSize.sm,
  },
  md: {
    fontSize: fontSize.md,
  },
  lg: {
    fontSize: fontSize.lg,
  },
  xl: {
    fontSize: fontSize.xl,
  },
};

export const iconSizes: { [size: string]: Sizing } = {
  xs: {
    height: sizing.md.height,
    width: sizing.md.width,
  },
  sm: {
    height: sizing.lg.height,
    width: sizing.lg.width,
  },
  md: {
    height: sizing.lg.height,
    width: sizing.lg.width,
  },
  lg: {
    height: sizing.xl.height,
    width: sizing.xl.width,
  },
  xl: {
    height: sizing.xl.height,
    width: sizing.xl.width,
  },
};
