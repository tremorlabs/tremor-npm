import React from "react";
import { twMerge } from "tailwind-merge";

import {
  DeltaTypes,
  borderRadius,
  defaultColors,
  getColorVariantsFromColorThemeValue,
  mapInputsToDeltaType,
  sizing,
} from "lib";
import { colors } from "./styles";

const getDeltaType = (value: number) => (value >= 0 ? DeltaTypes.Increase : DeltaTypes.Decrease);

export interface DeltaBarProps extends React.HTMLAttributes<HTMLDivElement> {
  percentageValue: number;
  isIncreasePositive?: boolean;
  tooltip?: string;
  showAnimation?: boolean;
}

const DeltaBar = React.forwardRef<HTMLDivElement, DeltaBarProps>((props, ref) => {
  const {
    percentageValue,
    isIncreasePositive = true,
    showAnimation = true,
    className,
    ...other
  } = props;
  const deltaType = mapInputsToDeltaType(getDeltaType(percentageValue), isIncreasePositive);

  return (
    <div
      ref={ref}
      className={twMerge(
        "relative flex items-center w-full",
        getColorVariantsFromColorThemeValue(defaultColors.background).bgColor,
        sizing.xs.height,
        borderRadius.lg.all,
        className,
      )}
      {...other}
    >
      <div className="flex justify-end h-full w-1/2">
        {percentageValue < 0 ? (
          <div
            className={twMerge(colors[deltaType].bgColor, borderRadius.full.left)}
            style={{
              width: `${Math.abs(percentageValue)}%`,
              transition: showAnimation ? "all 2s" : "",
            }}
          />
        ) : null}
      </div>
      <div
        className={twMerge(
          "ring-2 z-10",
          getColorVariantsFromColorThemeValue(defaultColors.darkBackground).bgColor,
          getColorVariantsFromColorThemeValue(defaultColors.white).ringColor,
          sizing.md.height,
          sizing.twoXs.width,
          borderRadius.lg.all,
        )}
      />
      <div className="flex justify-start h-full w-1/2">
        {percentageValue >= 0 ? (
          <div
            className={twMerge(colors[deltaType].bgColor, borderRadius.full.right)}
            style={{
              width: `${Math.abs(percentageValue)}%`,
              transition: showAnimation ? "all 2s" : "",
            }}
          />
        ) : null}
      </div>
    </div>
  );
});

export default DeltaBar;
