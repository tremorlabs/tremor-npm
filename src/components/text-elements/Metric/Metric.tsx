import React from "react";
import clsx from "clsx";

import {
  BaseColors,
  fontSize,
  fontWeight,
  getColor,
  getColorVariantsFromColorThemeValue,
  parseMarginTop,
  parseTruncateOption,
} from "lib";
import { Color, MarginTop } from "../../../lib";

export interface MetricProps {
  color?: Color;
  truncate?: boolean;
  marginTop?: MarginTop;
  children: React.ReactNode;
}

const Metric = ({
  color = BaseColors.Gray,
  truncate = false,
  marginTop = "mt-0",
  children,
}: MetricProps) => {
  return (
    <div className={clsx("tremor-base", parseMarginTop(marginTop))}>
      <p
        className={clsx(
          "text-elem",
          truncate ? "tr-whitespace-nowrap" : "tr-shrink-0",
          parseTruncateOption(truncate),
          getColorVariantsFromColorThemeValue(getColor(color).darkText).textColor,
          fontSize.threeXl,
          fontWeight.lg,
        )}
      >
        {children}
      </p>
    </div>
  );
};

export default Metric;
