import {
  Sizing,
  defaultColors,
  fontSize,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
  getColorTheme,
} from "lib";

import { Color, ButtonVariant } from "../../../lib/inputTypes";

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

export const getButtonProportions = (variant: ButtonVariant) => {
  if (!(variant === "light")) {
    return {
      xs: {
        paddingLeft: spacing.md.paddingLeft,
        paddingRight: spacing.md.paddingRight,
        paddingTop: spacing.xs.paddingTop,
        paddingBottom: spacing.xs.paddingBottom,
        fontSize: fontSize.xs,
      },
      sm: {
        paddingLeft: spacing.twoXl.paddingLeft,
        paddingRight: spacing.twoXl.paddingRight,
        paddingTop: spacing.sm.paddingTop,
        paddingBottom: spacing.sm.paddingBottom,
        fontSize: fontSize.sm,
      },
      md: {
        paddingLeft: spacing.twoXl.paddingLeft,
        paddingRight: spacing.twoXl.paddingRight,
        paddingTop: spacing.sm.paddingTop,
        paddingBottom: spacing.sm.paddingBottom,
        fontSize: fontSize.md,
      },
      lg: {
        paddingLeft: spacing.twoXl.paddingLeft,
        paddingRight: spacing.twoXl.paddingRight,
        paddingTop: spacing.md.paddingTop,
        paddingBottom: spacing.md.paddingBottom,
        fontSize: fontSize.lg,
      },
      xl: {
        paddingLeft: spacing.twoXl.paddingLeft,
        paddingRight: spacing.twoXl.paddingRight,
        paddingTop: spacing.lg.paddingTop,
        paddingBottom: spacing.lg.paddingBottom,
        fontSize: fontSize.xl,
      },
    };
  }
  return {
    xs: {
      paddingLeft: "",
      paddingRight: "",
      paddingTop: "",
      paddingBottom: "",
      fontSize: fontSize.xs,
    },
    sm: {
      paddingLeft: "",
      paddingRight: "",
      paddingTop: "",
      paddingBottom: "",
      fontSize: fontSize.sm,
    },
    md: {
      paddingLeft: "",
      paddingRight: "",
      paddingTop: "",
      paddingBottom: "",
      fontSize: fontSize.md,
    },
    lg: {
      paddingLeft: "",
      paddingRight: "",
      paddingTop: "",
      paddingBottom: "",
      fontSize: fontSize.lg,
    },
    xl: {
      paddingLeft: "",
      paddingRight: "",
      paddingTop: "",
      paddingBottom: "",
      fontSize: fontSize.xl,
    },
  };
};

export const getButtonColors = (variant: ButtonVariant, color: Color) => {
  switch (variant) {
    case "primary":
      return {
        textColor: getColorVariantsFromColorThemeValue(defaultColors.white)
          .textColor,
        hoverTextColor: getColorVariantsFromColorThemeValue(defaultColors.white)
          .textColor,
        bgColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).background
        ).bgColor,
        hoverBgColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).darkBackground
        ).hoverBgColor,
        borderColor: getColorVariantsFromColorThemeValue(
          defaultColors.transparent
        ).borderColor,
        hoverBorderColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).darkBackground
        ).hoverBorderColor,
        focusRingColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).ring
        ).focusRingColor,
      };
    case "secondary":
      return {
        textColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).text
        ).textColor,
        hoverTextColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).text
        ).textColor,
        bgColor: getColorVariantsFromColorThemeValue(defaultColors.transparent)
          .bgColor,
        hoverBgColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).lightBackground
        ).hoverBgColor,
        borderColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).border
        ).borderColor,
        hoverBorderColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).darkBorder
        ).borderColor,
        focusRingColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).ring
        ).focusRingColor,
      };
    case "light":
      return {
        textColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).text
        ).textColor,
        hoverTextColor: getColorVariantsFromColorThemeValue(
          getColorTheme(color).darkText
        ).hoverTextColor,
        bgColor: getColorVariantsFromColorThemeValue(defaultColors.transparent)
          .bgColor,
        hoverBgColor: getColorVariantsFromColorThemeValue(
          defaultColors.transparent
        ).hoverBgColor,
        borderColor: "",
        hoverBorderColor: "",
        focusRingColor: "",
      };
  }
};
