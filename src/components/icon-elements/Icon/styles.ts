import {
  Sizing,
  border,
  borderRadius,
  boxShadow,
  defaultColors,
  getColor,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
} from "lib";

import { Color, IconVariant } from "../../../lib/inputTypes";

export type WrapperProportionTypes = {
  paddingX: string;
  paddingY: string;
};

export const wrapperProportions: { [size: string]: WrapperProportionTypes } = {
  xs: {
    paddingX: spacing.xs.paddingX,
    paddingY: spacing.xs.paddingY,
  },
  sm: {
    paddingX: spacing.xs.paddingX,
    paddingY: spacing.xs.paddingY,
  },
  md: {
    paddingX: spacing.sm.paddingX,
    paddingY: spacing.sm.paddingY,
  },
  lg: {
    paddingX: spacing.sm.paddingX,
    paddingY: spacing.sm.paddingY,
  },
  xl: {
    paddingX: spacing.md.paddingX,
    paddingY: spacing.md.paddingY,
  },
};

export const iconSizes: { [size: string]: Sizing } = {
  xs: {
    height: sizing.sm.height,
    width: sizing.sm.width,
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
    height: sizing.twoXl.height,
    width: sizing.twoXl.width,
  },
  xl: {
    height: sizing.threeXl.height,
    width: sizing.threeXl.width,
  },
};

export type ShapeTypes = {
  rounded: string;
  border: string;
  ring: string;
  shadow: string;
};

export const shape: { [style: string]: ShapeTypes } = {
  simple: {
    rounded: "",
    border: "",
    ring: "",
    shadow: "",
  },
  light: {
    rounded: borderRadius.lg.all,
    border: "",
    ring: "",
    shadow: "",
  },
  shadow: {
    rounded: borderRadius.lg.all,
    border: border.sm.all,
    ring: "",
    shadow: boxShadow.md,
  },
  solid: {
    rounded: borderRadius.lg.all,
    border: border.md.all,
    ring: "ring-1",
    shadow: "",
  },
  outlined: {
    rounded: borderRadius.lg.all,
    border: border.sm.all,
    ring: "ring-2",
    shadow: "",
  },
};

export const getIconColors = (variant: IconVariant, color: Color) => {
  switch (variant) {
    case "simple":
      return {
        textColor: getColorVariantsFromColorThemeValue(getColor(color).text).textColor,
        bgColor: "",
        borderColor: "",
        ringColor: "",
      };
    case "light":
      return {
        textColor: getColorVariantsFromColorThemeValue(getColor(color).text).textColor,
        bgColor: getColorVariantsFromColorThemeValue(getColor(color).lightBackground).bgColor,
        borderColor: "",
        ringColor: "",
      };
    case "shadow":
      return {
        textColor: getColorVariantsFromColorThemeValue(getColor(color).text).textColor,
        bgColor: getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
        borderColor: getColorVariantsFromColorThemeValue(defaultColors.lightBorder).borderColor,
        ringColor: "",
      };
    case "solid":
      return {
        textColor: getColorVariantsFromColorThemeValue(defaultColors.white).textColor,
        bgColor: getColorVariantsFromColorThemeValue(getColor(color).background).bgColor,
        borderColor: getColorVariantsFromColorThemeValue(defaultColors.white).borderColor,
        ringColor: getColorVariantsFromColorThemeValue(defaultColors.lightBorder).ringColor,
      };
    case "outlined":
      return {
        textColor: getColorVariantsFromColorThemeValue(getColor(color).text).textColor,
        bgColor: getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
        borderColor: getColorVariantsFromColorThemeValue(getColor(color).border).borderColor,
        ringColor: getColorVariantsFromColorThemeValue(getColor(color).lightRing).ringColor,
      };
  }
};
