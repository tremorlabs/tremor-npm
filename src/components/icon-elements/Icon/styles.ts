import {
  Sizing,
  border,
  borderRadius,
  boxShadow,
  defaultColors,
  getColorTheme,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
} from "lib";

import { Color, IconVariant } from "../../../lib/inputTypes";

export type WrapperProportionTypes = {
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
};

export const wrapperProportions: { [size: string]: WrapperProportionTypes } = {
  xs: {
    paddingLeft: spacing.xs.paddingLeft,
    paddingRight: spacing.xs.paddingRight,
    paddingTop: spacing.xs.paddingTop,
    paddingBottom: spacing.xs.paddingBottom,
  },
  sm: {
    paddingLeft: spacing.xs.paddingLeft,
    paddingRight: spacing.xs.paddingRight,
    paddingTop: spacing.xs.paddingTop,
    paddingBottom: spacing.xs.paddingBottom,
  },
  md: {
    paddingLeft: spacing.sm.paddingLeft,
    paddingRight: spacing.sm.paddingRight,
    paddingTop: spacing.sm.paddingTop,
    paddingBottom: spacing.sm.paddingBottom,
  },
  lg: {
    paddingLeft: spacing.sm.paddingLeft,
    paddingRight: spacing.sm.paddingRight,
    paddingTop: spacing.sm.paddingTop,
    paddingBottom: spacing.sm.paddingBottom,
  },
  xl: {
    paddingLeft: spacing.md.paddingLeft,
    paddingRight: spacing.md.paddingRight,
    paddingTop: spacing.md.paddingTop,
    paddingBottom: spacing.md.paddingBottom,
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
    ring: "tr-ring-1",
    shadow: "",
  },
  outlined: {
    rounded: borderRadius.lg.all,
    border: border.sm.all,
    ring: "tr-ring-2",
    shadow: "",
  },
};

export const getIconColors = (variant: IconVariant, color: Color) => {
  switch (variant) {
    case "simple":
      return {
        textColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).text
        ).textColor,
        bgColor: "",
        borderColor: "",
        ringColor: "",
      };
    case "light":
      return {
        textColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).text
        ).textColor,
        bgColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).lightBackground
        ).bgColor,
        borderColor: "",
        ringColor: "",
      };
    case "shadow":
      return {
        textColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).text
        ).textColor,
        bgColor: getColorVariantsFromColorThemeValue(defaultColors.white)
          .bgColor,
        borderColor: getColorVariantsFromColorThemeValue(
          defaultColors.lightBorder
        ).borderColor,
        ringColor: "",
      };
    case "solid":
      return {
        textColor: getColorVariantsFromColorThemeValue(defaultColors.white)
          .textColor,
        bgColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).background
        ).bgColor,
        borderColor: getColorVariantsFromColorThemeValue(defaultColors.white)
          .borderColor,
        ringColor: getColorVariantsFromColorThemeValue(
          defaultColors.lightBorder
        ).ringColor,
      };
    case "outlined":
      return {
        textColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).text
        ).textColor,
        bgColor: getColorVariantsFromColorThemeValue(defaultColors.white)
          .bgColor,
        borderColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).border
        ).borderColor,
        ringColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).lightRing
        ).ringColor,
      };
  }
};
