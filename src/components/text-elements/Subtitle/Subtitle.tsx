import React from "react";

import {
  BaseColors,
  classNames,
  fontSize,
  fontWeight,
  getColorTheme,
  getColorVariantsFromColorThemeValue,
  parseMarginTop,
  parseTruncateOption,
} from "lib";
import { Color, MarginTop } from "../../../lib";

export interface SubtitleProps {
  color?: Color;
  truncate?: boolean;
  marginTop?: MarginTop;
  children: React.ReactNode;
}

const Subtitle = ({
  color = BaseColors.Gray,
  truncate = false,
  marginTop = "mt-0",
  children,
}: SubtitleProps) => {
  return (
    <p
      className={classNames(
        "text-elem tremor-base",
        truncate ? "tr-whitespace-nowrap" : "tr-shrink-0",
        parseTruncateOption(truncate),
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
