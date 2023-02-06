import React from "react";
import clsx from "clsx";

import {
  BaseColors,
  border,
  borderRadius,
  fontSize,
  fontWeight,
  getColor,
  getColorVariantsFromColorThemeValue,
  parseHeight,
  parseMarginTop,
  sizing,
  spacing,
} from "lib";
import { Color, Height, MarginTop } from "../../../lib";

export interface CalloutProps {
  title: string;
  text: string;
  icon?: React.ElementType;
  color?: Color;
  height?: Height | "";
  marginTop?: MarginTop;
}

const Callout = ({
  title,
  text,
  icon,
  color = BaseColors.Blue,
  height = "",
  marginTop = "mt-0",
}: CalloutProps) => {
  const Icon = icon ? icon : null;
  return (
    <div
      className={clsx(
        "tremor-base relative",
        parseMarginTop(marginTop),
        getColorVariantsFromColorThemeValue(getColor(color).canvasBackground).bgColor,
        getColorVariantsFromColorThemeValue(getColor(color).darkBorder).borderColor,
        spacing.lg.paddingLeft,
        spacing.lg.paddingRight,
        spacing.lg.paddingTop,
        spacing.lg.paddingBottom,
        fontSize.sm,
        borderRadius.md.all,
        border.lg.left,
      )}
    >
      <div className={clsx("overflow-hidden", spacing.xs.marginLeft)}>
        <div
          className={clsx(
            "flex items-start",
            getColorVariantsFromColorThemeValue(getColor(color).darkText).textColor,
          )}
        >
          {Icon ? (
            <Icon
              className={clsx(
                "flex-none",
                sizing.lg.height,
                sizing.lg.width,
                spacing.xs.marginRight,
              )}
              aria-hidden="true"
            />
          ) : null}
          <h4 className={clsx("text-elem", fontWeight.lg)}>{title}</h4>
        </div>
        <div
          className={clsx(
            "overflow-y-auto",
            height ? parseHeight(height) : height,
            getColorVariantsFromColorThemeValue(getColor(color).darkText).textColor,
            spacing.sm.marginTop,
          )}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default Callout;
