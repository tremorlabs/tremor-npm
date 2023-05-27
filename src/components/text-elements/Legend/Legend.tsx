import React from "react";
import { twMerge } from "tailwind-merge";

import { Color } from "../../../lib";
import {
  fontSize,
  fontWeight,
  getColorClassNames,
  makeClassName,
  sizing,
  spacing,
  themeColorRange,
} from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

const makeLegendClassName = makeClassName("Legend");

export interface LegendItemProps {
  name: string;
  color: Color;
}

const LegendItem = ({ name, color }: LegendItemProps) => (
  <li
    className={twMerge(
      makeLegendClassName("legendItem"),
      "termor-elem inline-flex items-center truncate",
      getColorClassNames(DEFAULT_COLOR, colorPalette.text).textColor,
      spacing.md.marginRight,
    )}
  >
    <svg
      className={twMerge(
        "termor-elem flex-none",
        getColorClassNames(color, colorPalette.text).textColor,
        sizing.xs.height,
        sizing.xs.width,
        spacing.xs.marginRight,
      )}
      fill="currentColor"
      viewBox="0 0 8 8"
    >
      <circle cx={4} cy={4} r={4} />
    </svg>
    <p className={twMerge("termor-elem whitespace-nowrap truncate", fontSize.sm, fontWeight.sm)}>
      {name}
    </p>
  </li>
);

export interface LegendProps extends React.OlHTMLAttributes<HTMLOListElement> {
  categories: string[];
  colors?: Color[];
}

const Legend = React.forwardRef<HTMLOListElement, LegendProps>((props, ref) => {
  const { categories, colors = themeColorRange, className, ...other } = props;
  return (
    <ol
      ref={ref}
      className={twMerge(
        makeLegendClassName("root"),
        "flex flex-wrap overflow-hidden truncate",
        className,
      )}
      {...other}
    >
      {categories.map((category, idx) => (
        <LegendItem key={`item-${idx}`} name={category} color={colors[idx]} />
      ))}
    </ol>
  );
});

Legend.displayName = "Legend";

export default Legend;
