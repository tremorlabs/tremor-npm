import React from "react";
import clsx from "clsx";

import {
  BaseColors,
  TextAlignments,
  fontSize,
  fontWeight,
  getColor,
  getColorVariantsFromColorThemeValue,
  parseHeight,
  parseMarginTop,
  parseTextAlignment,
  parseTruncateOption,
} from "lib";
import { Color, Height, MarginTop, TextAlignment } from "../../../lib/inputTypes";

export interface TextProps {
  color?: Color;
  textAlignment?: TextAlignment;
  truncate?: boolean;
  height?: Height | "";
  marginTop?: MarginTop;
  children: React.ReactNode;
}

const Text = ({
  color = BaseColors.Gray,
  textAlignment = TextAlignments.Left,
  truncate = false,
  height = "",
  marginTop = "mt-0",
  children,
}: TextProps) => {
  return (
    <p
      className={clsx(
        "text-elem tremor-base",
        parseTruncateOption(truncate),
        truncate ? "tr-whitespace-nowrap" : "tr-shrink-0",
        height ? parseHeight(height) : height,
        height ? "tr-overflow-y-auto" : "",
        parseMarginTop(marginTop),
        parseTextAlignment(textAlignment),
        getColorVariantsFromColorThemeValue(getColor(color).text).textColor,
        fontSize.sm,
        fontWeight.sm,
      )}
    >
      {children}
    </p>
  );
};

export default Text;
