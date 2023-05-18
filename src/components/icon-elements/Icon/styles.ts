import { Sizing, border, getColorClassNames, sizing, spacing } from "lib";

import { Color, IconVariant } from "../../../lib/inputTypes";
import { colorPalette } from "lib/theme";

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
    rounded: "rounded-tremor-default",
    border: "",
    ring: "",
    shadow: "",
  },
  shadow: {
    rounded: "rounded-tremor-default",
    border: border.sm.all,
    ring: "",
    shadow: "shadow-tremor-default",
  },
  solid: {
    rounded: "rounded-tremor-default",
    border: border.md.all,
    ring: "ring-1",
    shadow: "",
  },
  outlined: {
    rounded: "rounded-tremor-default",
    border: border.sm.all,
    ring: "ring-2",
    shadow: "",
  },
};

export const getIconColors = (variant: IconVariant, color: Color) => {
  switch (variant) {
    case "simple":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-tremor-brand",
        bgColor: "",
        borderColor: "",
        ringColor: "",
      };
    case "light":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-tremor-brand",
        bgColor: color
          ? getColorClassNames(color, colorPalette.lightBackground).bgColor
          : "bg-tremor-brand-muted",
        borderColor: "",
        ringColor: "",
      };
    case "shadow":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-tremor-brand",
        bgColor: color
          ? getColorClassNames(color, colorPalette.lightBackground).bgColor
          : "bg-tremor-background",
        borderColor: "border-tremor",
        ringColor: "",
      };
    case "solid":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-tremor-brand-inverted",
        bgColor: color
          ? getColorClassNames(color, colorPalette.lightBackground).bgColor
          : "bg-tremor-brand",
        borderColor: "border-tremor-brand-inverted",
        ringColor: "ring-tremor-ring",
      };
    case "outlined":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-tremor-brand",
        bgColor: color
          ? getColorClassNames(color, colorPalette.lightBackground).bgColor
          : "bg-tremor-background",
        borderColor: color
          ? getColorClassNames(color, colorPalette.ring).borderColor
          : "border-tremor-brand-subtle",
        ringColor: color
          ? getColorClassNames(color, colorPalette.lightRing).ringColor
          : "ring-tremor-brand-muted",
      };
  }
};
