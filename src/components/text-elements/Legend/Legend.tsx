import React from "react";
import clsx from "clsx";

import { Color, MarginTop } from "../../../lib";
import {
  defaultColors,
  fontSize,
  fontWeight,
  getColor,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
  themeColorRange,
} from "lib";

export interface LegendItemProps {
  name: string;
  color: Color;
}

const LegendItem = ({ name, color }: LegendItemProps) => (
  <li
    className={clsx(
      "termor-elem inline-flex items-center truncate",
      getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
      spacing.md.marginRight,
    )}
  >
    <svg
      className={clsx(
        "termor-elem flex-none",
        getColorVariantsFromColorThemeValue(getColor(color).text).textColor,
        sizing.xs.height,
        sizing.xs.width,
        spacing.xs.marginRight,
      )}
      fill="currentColor"
      viewBox="0 0 8 8"
    >
      <circle cx={4} cy={4} r={4} />
    </svg>
    <p className={clsx("termor-elem whitespace-nowrap truncate", fontSize.sm, fontWeight.sm)}>
      {name}
    </p>
  </li>
);

export interface LegendProps extends React.OlHTMLAttributes<HTMLOListElement> {
  categories: string[];
  colors?: Color[];
  marginTop?: MarginTop;
}

const Legend = React.forwardRef<HTMLOListElement, LegendProps>((props, ref) => {
  const { categories, colors = themeColorRange, className, ...other } = props;
  return (
    <ol ref={ref} className={clsx("flex flex-wrap overflow-hidden truncate", className)} {...other}>
      {categories.map((category, idx) => (
        <LegendItem key={`item-${idx}`} name={category} color={colors[idx]} />
      ))}
    </ol>
  );
});

export default Legend;
