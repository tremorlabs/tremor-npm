import React from "react";
import clsx from "clsx";

import { Color, MarginTop } from "../../../lib";
import {
  defaultColors,
  fontSize,
  fontWeight,
  getColor,
  getColorVariantsFromColorThemeValue,
  parseMarginTop,
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
      "termor-elem tr-inline-flex tr-items-center tr-truncate",
      getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
      spacing.md.marginRight,
    )}
  >
    <svg
      className={clsx(
        "termor-elem tr-flex-none",
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
    <p
      className={clsx(
        "text-elem termor-elem tr-whitespace-nowrap tr-truncate",
        fontSize.sm,
        fontWeight.sm,
      )}
    >
      {name}
    </p>
  </li>
);

export interface LegendProps {
  categories: string[];
  colors?: Color[];
  marginTop?: MarginTop;
}

const Legend = ({ categories, colors = themeColorRange, marginTop = "mt-0" }: LegendProps) => {
  return (
    <div className={clsx("tremor-base termor-elem", parseMarginTop(marginTop))}>
      <ol className="list-element tr-flex tr-flex-wrap tr-overflow-hidden tr-truncate">
        {categories.map((category, idx) => (
          <LegendItem key={`item-${idx}`} name={category} color={colors[idx]} />
        ))}
      </ol>
    </div>
  );
};

export default Legend;
