/* eslint-disable max-len */
import {
  BaseColors,
  Importances,
  Sizing,
  colorTheme,
  defaultColors,
  fontSize,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
} from "lib";

export type ButtonProportionTypes = {
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
  fontSize: string;
};

export const buttonProportions: { [char: string]: ButtonProportionTypes } = {
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

export type ColorTypes = {
  textColor: string;
  bgColor: string;
  hoverBgColor: string;
  borderColor: string;
  hoverBorderColor: string;
  focusRingColor: string;
};

export const colors: {
  [baseColor: string]: { [importance: string]: ColorTypes };
} = {
  [BaseColors.Slate]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Slate].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Slate].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Slate].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Slate].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Slate].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Slate].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Slate].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Slate].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Slate].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Gray]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Gray].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Gray].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Gray].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Gray].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Gray].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Gray].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Gray].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Gray].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Gray].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Zinc]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Zinc].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Zinc].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Zinc].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Zinc].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Zinc].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Zinc].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Zinc].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Zinc].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Zinc].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Neutral]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Neutral].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Neutral].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Neutral].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Neutral].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Neutral].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Neutral].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Neutral].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Neutral].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Neutral].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Stone]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Stone].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Stone].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Stone].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Stone].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Stone].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Stone].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Stone].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Stone].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Stone].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Red]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Red].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Red].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Red].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Red].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Red].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Red].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Red].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Red].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Red].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Orange]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Orange].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Orange].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Orange].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Orange].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Orange].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Orange].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Orange].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Orange].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Orange].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Amber]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Amber].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Amber].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Amber].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Amber].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Amber].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Amber].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Amber].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Amber].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Amber].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Yellow]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Yellow].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Yellow].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Yellow].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Yellow].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Yellow].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Yellow].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Yellow].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Yellow].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Yellow].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Lime]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Lime].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Lime].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Lime].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Lime].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Lime].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Lime].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Lime].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Lime].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Lime].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Green]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Green].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Green].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Green].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Green].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Green].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Green].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Green].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Green].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Green].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Emerald]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Emerald].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Emerald].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Emerald].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Emerald].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Emerald].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Emerald].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Emerald].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Emerald].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Emerald].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Teal]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Teal].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Teal].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Teal].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Teal].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Teal].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Teal].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Teal].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Teal].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Teal].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Cyan]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Cyan].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Cyan].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Cyan].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Cyan].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Cyan].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Cyan].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Cyan].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Cyan].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Cyan].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Sky]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Sky].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Sky].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Sky].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Sky].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Sky].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Sky].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Sky].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Sky].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Sky].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Blue]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Blue].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Blue].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Blue].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Blue].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Blue].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Blue].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Blue].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Blue].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Blue].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Indigo]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Indigo].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Indigo].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Indigo].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Blue].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Indigo].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Indigo].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Indigo].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Indigo].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Blue].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Violet]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Violet].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Violet].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Violet].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Violet].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Violet].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Violet].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Violet].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Violet].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Violet].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Purple]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Purple].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Purple].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Purple].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Purple].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Purple].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Purple].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Purple].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Purple].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Purple].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Fuchsia]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Fuchsia].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Fuchsia].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Fuchsia].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Fuchsia].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Fuchsia].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Fuchsia].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Fuchsia].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Fuchsia].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Fuchsia].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Pink]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Pink].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Pink].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Pink].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Pink].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Pink].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Pink].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Pink].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Pink].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Pink].ring
      ).focusRingColor,
    },
  },
  [BaseColors.Rose]: {
    [Importances.Primary]: {
      textColor: getColorVariantsFromColorThemeValue(defaultColors["white"])
        .textColor,
      bgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Rose].background
      ).bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Rose].darkBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        defaultColors["transparent"]
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Rose].darkBackground
      ).hoverBorderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Rose].ring
      ).focusRingColor,
    },
    [Importances.Secondary]: {
      textColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Rose].text
      ).textColor,
      bgColor: getColorVariantsFromColorThemeValue(defaultColors["transparent"])
        .bgColor,
      hoverBgColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Rose].lightBackground
      ).hoverBgColor,
      borderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Rose].border
      ).borderColor,
      hoverBorderColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Rose].darkBorder
      ).borderColor,
      focusRingColor: getColorVariantsFromColorThemeValue(
        colorTheme[BaseColors.Rose].ring
      ).focusRingColor,
    },
  },
};
