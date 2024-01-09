import { getColorClassNames, tremorTwMerge, colorPalette, Color, IconVariant } from "lib";

export type WrapperProportionTypes = {
  paddingX: string;
  paddingY: string;
};

export const wrapperProportions: { [size: string]: WrapperProportionTypes } = {
  xs: {
    paddingX: "px-1.5",
    paddingY: "py-1.5",
  },
  sm: {
    paddingX: "px-1.5",
    paddingY: "py-1.5",
  },
  md: {
    paddingX: "px-2",
    paddingY: "py-2",
  },
  lg: {
    paddingX: "px-2",
    paddingY: "py-2",
  },
  xl: {
    paddingX: "px-2.5",
    paddingY: "py-2.5",
  },
};

export const iconSizes: {
  [size: string]: {
    height: string;
    width: string;
  };
} = {
  xs: {
    height: "h-3",
    width: "w-3",
  },
  sm: {
    height: "h-5",
    width: "w-5",
  },
  md: {
    height: "h-5",
    width: "w-5",
  },
  lg: {
    height: "h-7",
    width: "w-7",
  },
  xl: {
    height: "h-9",
    width: "w-9",
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
    border: "border",
    ring: "",
    shadow: "shadow-tremor-card dark:shadow-dark-tremor-card",
  },
  solid: {
    rounded: "rounded-tremor-default",
    border: "border-2",
    ring: "ring-1",
    shadow: "",
  },
  outlined: {
    rounded: "rounded-tremor-default",
    border: "border",
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
