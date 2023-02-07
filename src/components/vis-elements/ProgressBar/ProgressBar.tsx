import React from "react";
import clsx from "clsx";

import {
  BaseColors,
  borderRadius,
  defaultColors,
  fontSize,
  fontWeight,
  getColor,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
} from "lib";
import { Color, MarginTop } from "../../../lib";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  percentageValue: number;
  label?: string;
  tooltip?: string;
  showAnimation?: boolean;
  color?: Color;
  marginTop?: MarginTop;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>((props, ref) => {
  const {
    percentageValue,
    label,
    showAnimation = true,
    color = BaseColors.Blue,
    className,
    ...other
  } = props;

  const primaryBgColor = getColorVariantsFromColorThemeValue(getColor(color).background).bgColor;
  const secondaryBgColor = getColorVariantsFromColorThemeValue(
    getColor(color).lightBackground,
  ).bgColor;

  return (
    <div ref={ref} className={clsx("flex items-center w-full", className)} {...other}>
      <div
        className={clsx(
          "relative flex items-center w-full",
          secondaryBgColor,
          sizing.xs.height,
          borderRadius.lg.all,
        )}
      >
        <div
          className={clsx(primaryBgColor, "flex-col h-full", borderRadius.lg.all)}
          style={{
            width: `${percentageValue}%`,
            transition: showAnimation ? "all 2s" : "",
          }}
        />
      </div>
      {label ? (
        <div
          className={clsx(
            "w-16 truncate text-right",
            getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
            spacing.sm.marginLeft,
          )}
        >
          <p className={clsx("shrink-0 whitespace-nowrap truncate", fontSize.sm, fontWeight.sm)}>
            {label}
          </p>
        </div>
      ) : null}
    </div>
  );
});

export default ProgressBar;
