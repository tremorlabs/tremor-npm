import { getColorClassNames, tremorTwMerge, ButtonVariant, Color, colorPalette } from "lib";

export const getButtonColors = (variant: ButtonVariant, color?: Color) => {
  switch (variant) {
    case "primary":
      return {
        textColor: color
          ? getColorClassNames("white").textColor
          : "text-tremor-brand-inverted dark:text-dark-tremor-brand-inverted",
        hoverTextColor: color
          ? getColorClassNames("white").textColor
          : "text-tremor-brand-inverted dark:text-dark-tremor-brand-inverted",
        bgColor: color
          ? getColorClassNames(color, colorPalette.background).bgColor
          : "bg-tremor-brand dark:bg-dark-tremor-brand",
        hoverBgColor: color
          ? getColorClassNames(color, colorPalette.darkBackground).hoverBgColor
          : "hover:bg-tremor-brand-emphasis dark:hover:bg-dark-tremor-brand-emphasis",
        borderColor: color
          ? getColorClassNames(color, colorPalette.border).borderColor
          : "border-tremor-brand dark:border-dark-tremor-brand",
        hoverBorderColor: color
          ? getColorClassNames(color, colorPalette.darkBorder).hoverBorderColor
          : "hover:border-tremor-brand-emphasis dark:hover:border-dark-tremor-brand-emphasis",
      };
    case "secondary":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-tremor-brand dark:text-dark-tremor-brand",
        hoverTextColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "hover:text-tremor-brand-emphasis dark:hover:text-dark-tremor-brand-emphasis",
        bgColor: getColorClassNames("transparent").bgColor,
        hoverBgColor: color
          ? tremorTwMerge(
              getColorClassNames(color, colorPalette.background).hoverBgColor,
              "hover:bg-opacity-20 dark:hover:bg-opacity-20",
            )
          : "hover:bg-tremor-brand-faint dark:hover:bg-dark-tremor-brand-faint",
        borderColor: color
          ? getColorClassNames(color, colorPalette.border).borderColor
          : "border-tremor-brand dark:border-dark-tremor-brand",
      };
    case "light":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-tremor-brand dark:text-dark-tremor-brand",
        hoverTextColor: color
          ? getColorClassNames(color, colorPalette.darkText).hoverTextColor
          : "hover:text-tremor-brand-emphasis dark:hover:text-dark-tremor-brand-emphasis",
        bgColor: getColorClassNames("transparent").bgColor,
        borderColor: "",
        hoverBorderColor: "",
      };
  }
};
