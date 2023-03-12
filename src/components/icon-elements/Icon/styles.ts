import { Sizing, border, borderRadius, boxShadow, getColorClassNames, sizing, spacing } from "lib";

import { Color, IconVariant } from "../../../lib/inputTypes";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

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
        textColor: getColorClassNames(color, colorPalette.text).textColor,
        bgColor: "",
        borderColor: "",
        ringColor: "",
      };
    case "light":
      return {
        textColor: getColorClassNames(color, colorPalette.text).textColor,
        bgColor: getColorClassNames(color, colorPalette.lightBackground).bgColor,
        borderColor: "",
        ringColor: "",
      };
    case "shadow":
      return {
        textColor: getColorClassNames(color, colorPalette.text).textColor,
        bgColor: getColorClassNames("white").bgColor,
        borderColor: getColorClassNames(DEFAULT_COLOR, colorPalette.lightBorder).borderColor,
        ringColor: "",
      };
    case "solid":
      return {
        textColor: getColorClassNames("white").textColor,
        bgColor: getColorClassNames(color, colorPalette.background).bgColor,
        borderColor: getColorClassNames("white").borderColor,
        ringColor: getColorClassNames(DEFAULT_COLOR, colorPalette.lightBorder).ringColor,
      };
    case "outlined":
      return {
        textColor: getColorClassNames(color, colorPalette.text).textColor,
        bgColor: getColorClassNames("white").bgColor,
        borderColor: getColorClassNames(color, colorPalette.ring).borderColor,
        ringColor: getColorClassNames(color, colorPalette.lightRing).ringColor,
      };
  }
};
