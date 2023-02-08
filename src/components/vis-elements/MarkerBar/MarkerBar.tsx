import React from "react";
import clsx from "clsx";

import {
  BaseColors,
  borderRadius,
  defaultColors,
  getColor,
  getColorVariantsFromColorThemeValue,
  sizing,
} from "lib";
import { Color } from "../../../lib";

export interface MarkerBarProps extends React.HTMLAttributes<HTMLDivElement> {
  percentageValue: number;
  color?: Color;
  tooltip?: string;
  showAnimation?: boolean;
}

const MarkerBar = React.forwardRef<HTMLDivElement, MarkerBarProps>((props, ref) => {
  const {
    percentageValue,
    color = BaseColors.Blue,
    showAnimation = true,
    className,
    ...other
  } = props;

  const primaryBgColor = getColorVariantsFromColorThemeValue(getColor(color).background).bgColor;
  const secondaryBgColor = getColorVariantsFromColorThemeValue(
    getColor(color).lightBackground,
  ).bgColor;

  return (
    <div
      ref={ref}
      className={clsx(
        "relative flex items-center w-full",
        secondaryBgColor,
        sizing.xs.height,
        borderRadius.lg.all,
        className,
      )}
      {...other}
    >
      <div
        className={clsx(
          "absolute right-1/2 -translate-x-1/2",
          sizing.lg.width, // wide transparent wrapper for tooltip activation
        )}
        style={{
          left: `${percentageValue}%`,
          transition: showAnimation ? "all 2s" : "",
        }}
      >
        <div
          className={clsx(
            "ring-2 mx-auto",
            primaryBgColor,
            getColorVariantsFromColorThemeValue(defaultColors.white).ringColor,
            sizing.md.height,
            sizing.twoXs.width,
            borderRadius.lg.all,
          )}
        />
      </div>
    </div>
  );
});

export default MarkerBar;
