import React from "react";
import { twMerge } from "tailwind-merge";

import { BaseColors, borderRadius, colorClassNames, sizing } from "lib";
import { Color } from "../../../lib";
import { DEFAULT_COLOR, colorPalette, WHITE } from "lib/theme";

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
      className={twMerge(
        "relative flex items-center w-full",
        colorClassNames[DEFAULT_COLOR][colorPalette.lightBackground].bgColor,
        sizing.xs.height,
        borderRadius.lg.all,
        className,
      )}
      {...other}
    >
      <div
        className={twMerge(
          "absolute h-full",
          colorClassNames[DEFAULT_COLOR][colorPalette.darkBackground].bgColor,
          borderRadius.lg.all,
        )}
        style={{
          left: `${minPercentageValue}%`,
          width: `${maxPercentageValue - minPercentageValue}%`,
          transition: showAnimation ? "all 2s" : "",
        }}
      />
      <div
        className={twMerge(
          "absolute right-1/2 -translate-x-1/2",
          sizing.lg.width, // wide transparent wrapper for tooltip activation
        )}
        style={{
          left: `${percentageValue}%`,
          transition: showAnimation ? "all 2s" : "",
        }}
      >
        <div
          className={twMerge(
            "ring-2 mx-auto",
            colorClassNames[color][colorPalette.background].bgColor,
            colorClassNames[WHITE]["none"].ringColor,
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
