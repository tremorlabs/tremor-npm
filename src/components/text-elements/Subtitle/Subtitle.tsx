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

export interface SubtitleProps {
  color?: Color;
  truncate?: boolean;
  textAlignment?: TextAlignment;
  marginTop?: MarginTop;
  children: React.ReactNode;
}

const Subtitle = ({
  color = BaseColors.Gray,
  truncate = false,
  textAlignment = TextAlignments.Left,
  marginTop = "mt-0",
  children,
}: SubtitleProps) => {
  return (
    <p
      className={classNames(
        "text-elem tremor-base",
        truncate ? "tr-whitespace-nowrap" : "tr-shrink-0",
        parseTruncateOption(truncate),
        parseTextAlignment(textAlignment),
        parseMarginTop(marginTop),
        getColorVariantsFromColorThemeValue(getColorTheme(color).lightText)
          .textColor,
        fontSize.md,
        fontWeight.sm
      )}
    >
      {children}
    </p>
  );
};

export default Subtitle;
