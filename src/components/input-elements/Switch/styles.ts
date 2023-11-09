import { Color, colorPalette, getColorClassNames } from "lib";

export const getSwitchColors = (color?: Color) => {
  return {
    bgColor: color
      ? getColorClassNames(color, colorPalette.background).bgColor
      : "bg-tremor-brand dark:bg-dark-tremor-brand",
    ringColor: color
      ? getColorClassNames(color, colorPalette.ring).ringColor
      : "ring-tremor-brand-muted dark:ring-dark-tremor-brand-muted",
  };
};
