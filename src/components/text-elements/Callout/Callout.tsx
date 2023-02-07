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
  sizing,
  spacing,
} from "lib";
import { Color, Height, MarginTop } from "../../../lib";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  text?: string;
  icon?: React.ElementType;
  color?: Color;
  height?: Height | ""; // Deprecated
  marginTop?: MarginTop;
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>((props, ref) => {
  const { title, text, icon, color = BaseColors.Blue, height = "", className, ...other } = props;

  console.log(
    "DeprecationWarning: The `height` property is deprecated and will be removed in the next major release. Please use classNames='h-*' instead",
  );
  console.log(
    "DeprecationWarning: The `text` property is deprecated and will be removed in the next major release. Please use children instead",
  );

  const Icon = icon;
  return (
    <div
      ref={ref}
      className={clsx(
        getColorVariantsFromColorThemeValue(getColor(color).canvasBackground).bgColor,
        getColorVariantsFromColorThemeValue(getColor(color).darkBorder).borderColor,
        spacing.lg.paddingLeft,
        spacing.lg.paddingRight,
        spacing.lg.paddingTop,
        spacing.lg.paddingBottom,
        fontSize.sm,
        borderRadius.md.all,
        border.lg.left,
        className,
      )}
      {...other}
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
            getColorVariantsFromColorThemeValue(getColor(color).darkText).textColor,
            spacing.sm.marginTop,
            height,
          )}
        >
          {text}
        </div>
      </div>
    </div>
  );
});

export default Callout;
