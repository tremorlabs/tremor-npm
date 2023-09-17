import React from "react";

import { Color, tremorTwMerge } from "../../../lib";
import { getColorClassNames, makeClassName, sizing, spacing, themeColorRange } from "lib";
import { colorPalette } from "lib/theme";

const makeLegendClassName = makeClassName("Legend");

export interface LegendItemProps {
  name: string;
  color: Color;
  onClick?: (name: string, color: Color) => void;
  activeLegend?: string
}

const LegendItem = ({ name, color, onClick, activeLegend }: LegendItemProps) => (
  <li
    className={tremorTwMerge(
      makeLegendClassName("legendItem"),
      // common
      "inline-flex items-center truncate",
      // light
      "text-tremor-content",
      // dark
      "dark:text-dark-tremor-content",
      spacing.md.marginRight,
      (activeLegend && activeLegend !== name) ? 'opacity-30' : 'opacity-100'
    )}
    onClick={(e) => {
      e.stopPropagation();
      onClick?.(name, color);
    }}
  >
    <svg
      className={tremorTwMerge(
        "flex-none",
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
    <p
      className={tremorTwMerge(
        // common
        "whitespace-nowrap truncate text-tremor-default",
        // light
        "text-tremor-content",
        // dark
        "dark:text-dark-tremor-content",
      )}
    >
      {name}
    </p>
  </li>
);

export interface LegendProps extends React.OlHTMLAttributes<HTMLOListElement> {
  categories: string[];
  colors?: Color[];
  onClickLegendItem?: (category: string, color: Color) => void;
  activeLegend?: string
}

const Legend = React.forwardRef<HTMLOListElement, LegendProps>((props, ref) => {
  const { categories, colors = themeColorRange, className, onClickLegendItem, activeLegend, ...other } = props;
  return (
    <ol
      ref={ref}
      className={tremorTwMerge(
        makeLegendClassName("root"),
        "flex flex-wrap overflow-hidden truncate",
        className,
      )}
      {...other}
    >
      {categories.map((category, idx) => (
        <LegendItem
          key={`item-${idx}`}
          name={category}
          color={colors[idx]}
          onClick={onClickLegendItem}
          activeLegend={activeLegend}
        />
      ))}
    </ol>
  );
});

Legend.displayName = "Legend";

export default Legend;
