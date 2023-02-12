import React from "react";

import {
  BaseColors,
  classNames,
  fontSize,
  fontWeight,
  getColorTheme,
  getColorVariantsFromColorThemeValue,
  parseMarginTop,
  parseTextAlignment,
  parseTruncateOption,
  TextAlignments,
} from "lib";
import { Color, MarginTop, TextAlignment } from "../../../lib/inputTypes";

export interface MetricProps {
  color?: Color;
  textAlignment?: TextAlignment;
  truncate?: boolean;
  marginTop?: MarginTop;
  children: React.ReactNode;
}

const Metric = ({
  color = BaseColors.Gray,
  textAlignment = TextAlignments.Left,
  truncate = false,
  marginTop = "mt-0",
  children,
}: MetricProps) => {
  return (
    <div className={classNames("tremor-base", parseMarginTop(marginTop))}>
      <p
        className={classNames(
          "text-elem",
          truncate ? "tr-whitespace-nowrap" : "tr-shrink-0",
          parseTruncateOption(truncate),
          parseTextAlignment(textAlignment),
          getColorVariantsFromColorThemeValue(getColorTheme(color).darkText)
            .textColor,
          fontSize.threeXl,
          fontWeight.lg
        )}
      >
        {children}
      </p>
    </div>
  );
};

export default Metric;
