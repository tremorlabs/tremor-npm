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
      className={clsx(
        "text-elem tremor-base",
        truncate ? "whitespace-nowrap" : "shrink-0",
        parseTruncateOption(truncate),
        parseMarginTop(marginTop),
        getColorVariantsFromColorThemeValue(getColor(color).lightText).textColor,
        fontSize.md,
        fontWeight.sm,
      )}
    >
      {children}
    </p>
  );
};

export default Subtitle;
