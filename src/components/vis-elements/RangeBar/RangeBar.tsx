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

export interface RangeBarProps extends React.HTMLAttributes<HTMLDivElement> {
  percentageValue: number;
  minPercentageValue: number;
  maxPercentageValue: number;
  markerTooltip?: string;
  rangeTooltip?: string;
  showAnimation?: boolean;
  color?: Color;
}

const RangeBar = React.forwardRef<HTMLDivElement, RangeBarProps>((props, ref) => {
  const {
    percentageValue,
    minPercentageValue,
    maxPercentageValue,
    showAnimation = true,
    color = BaseColors.Blue,
    className,
    ...other
  } = props;
  return (
    <div
      ref={ref}
      className={clsx(
        "relative flex items-center w-full",
        getColorVariantsFromColorThemeValue(defaultColors.lightBackground).bgColor,
        sizing.xs.height,
        borderRadius.lg.all,
        className,
      )}
      {...other}
    >
      <div
        className={clsx(
          "absolute h-full",
          getColorVariantsFromColorThemeValue(defaultColors.darkBackground).bgColor,
          borderRadius.lg.all,
        )}
        style={{
          left: `${minPercentageValue}%`,
          width: `${maxPercentageValue - minPercentageValue}%`,
          transition: showAnimation ? "all 2s" : "",
        }}
      />
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
            getColorVariantsFromColorThemeValue(getColor(color).background).bgColor,
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

export default RangeBar;
