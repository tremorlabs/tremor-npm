import React from "react";

import {
  BaseColors,
  TextAlignments,
  classNames,
  fontSize,
  fontWeight,
  getColorTheme,
  getColorVariantsFromColorThemeValue,
  parseMarginTop,
  parseTextAlignment,
  parseTruncateOption,
} from "lib";
import { Color, MarginTop, TextAlignment } from "../../../lib";

export interface TitleProps {
  color?: Color;
  truncate?: boolean;
  textAlignment?: TextAlignment;
  marginTop?: MarginTop;
  children: React.ReactNode;
}

const Title = ({
  color = BaseColors.Gray,
  truncate = false,
  textAlignment = TextAlignments.Left,
  marginTop = "mt-0",
  children,
}: TitleProps) => {
  return (
    <p
      className={classNames(
        "text-elem tremor-base",
        truncate ? "tr-whitespace-nowrap" : "tr-shrink-0",
        parseTruncateOption(truncate),
        parseTextAlignment(textAlignment),
        parseMarginTop(marginTop),
        getColorVariantsFromColorThemeValue(getColorTheme(color).darkText)
          .textColor,
        fontSize.lg,
        fontWeight.md
      )}
    >
      {children}
    </p>
  );
};

export default Title;
