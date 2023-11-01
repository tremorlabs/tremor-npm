import { border, getColorClassNames, Sizing, sizing, spacing, tremorTwMerge } from "lib";

import { colorPalette } from "lib/theme";
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
    rounded: "rounded-tremor-default",
    border: "",
    ring: "",
    shadow: "",
  },
  shadow: {
    rounded: "rounded-tremor-default",
    border: border.sm.all,
    ring: "",
    shadow: "shadow-tremor-card dark:shadow-dark-tremor-card",
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

export const getIconColors = (variant: IconVariant, color?: Color) => {
  switch (variant) {
    case "simple":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-tremor-brand dark:text-dark-tremor-brand",
        bgColor: "",
        borderColor: "",
        ringColor: "",
      };
    case "light":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-tremor-brand dark:text-dark-tremor-brand",
        bgColor: color
          ? tremorTwMerge(
              getColorClassNames(color, colorPalette.background).bgColor,
              "bg-opacity-20",
            )
          : "bg-tremor-brand-muted dark:bg-dark-tremor-brand-muted",
        borderColor: "",
        ringColor: "",
      };
    case "shadow":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-tremor-brand dark:text-dark-tremor-brand",
        bgColor: color
          ? tremorTwMerge(
              getColorClassNames(color, colorPalette.background).bgColor,
              "bg-opacity-20",
            )
          : "bg-tremor-background dark:bg-dark-tremor-background",
        borderColor: "border-tremor-border dark:border-dark-tremor-border",
        ringColor: "",
      };
    case "solid":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-tremor-brand-inverted dark:text-dark-tremor-brand-inverted",
        bgColor: color
          ? tremorTwMerge(
              getColorClassNames(color, colorPalette.background).bgColor,
              "bg-opacity-20",
            )
          : "bg-tremor-brand dark:bg-dark-tremor-brand",
        borderColor: "border-tremor-brand-inverted dark:border-dark-tremor-brand-inverted",
        ringColor: "ring-tremor-ring dark:ring-dark-tremor-ring",
      };
    case "outlined":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-tremor-brand dark:text-dark-tremor-brand",
        bgColor: color
          ? tremorTwMerge(
              getColorClassNames(color, colorPalette.background).bgColor,
              "bg-opacity-20",
            )
          : "bg-tremor-background dark:bg-dark-tremor-background",
        borderColor: color
          ? getColorClassNames(color, colorPalette.ring).borderColor
          : "border-tremor-brand-subtle dark:border-dark-tremor-brand-subtle",
        ringColor: color
          ? tremorTwMerge(getColorClassNames(color, colorPalette.ring).ringColor, "ring-opacity-40")
          : "ring-tremor-brand-muted dark:ring-dark-tremor-brand-muted",
      };
  }
};
