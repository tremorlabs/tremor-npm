import React from "react";
import { twMerge } from "tailwind-merge";

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
import { Color } from "../../../lib";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  text?: string;
  icon?: React.ElementType;
  color?: Color;
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>((props, ref) => {
  const { title, text, icon, color = BaseColors.Blue, className, ...other } = props;

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
      className={twMerge(
        getColorVariantsFromColorThemeValue(getColor(color).canvasBackground).bgColor,
        getColorVariantsFromColorThemeValue(getColor(color).darkBorder).borderColor,
        spacing.lg.paddingAll,
        fontSize.sm,
        borderRadius.md.all,
        border.lg.left,
        className,
      )}
      {...other}
    >
      <div className={twMerge("overflow-hidden", spacing.xs.marginLeft)}>
        <div
          className={twMerge(
            "flex items-start",
            getColorVariantsFromColorThemeValue(getColor(color).darkText).textColor,
          )}
        >
          {Icon ? (
            <Icon
              className={twMerge(
                "flex-none",
                sizing.lg.height,
                sizing.lg.width,
                spacing.xs.marginRight,
              )}
              aria-hidden="true"
            />
          ) : null}
          <h4 className={twMerge("text-elem", fontWeight.lg)}>{title}</h4>
        </div>
        <div
          className={twMerge(
            "overflow-y-auto",
            getColorVariantsFromColorThemeValue(getColor(color).darkText).textColor,
            spacing.sm.marginTop,
          )}
        >
          {text}
        </div>
      </div>
    </div>
  );
});

export default Callout;
