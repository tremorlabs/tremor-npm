import React from "react";
import clsx from "clsx";
import "tippy.js/dist/tippy.css";
import Tooltip from "@tippyjs/react";

import {
  DeltaTypes,
  borderRadius,
  defaultColors,
  getColorVariantsFromColorThemeValue,
  mapInputsToDeltaType,
  parseMarginTop,
  sizing,
} from "lib";
import { MarginTop } from "../../../lib";
import { colors } from "./styles";

const getDeltaType = (value: number) => (value >= 0 ? DeltaTypes.Increase : DeltaTypes.Decrease);

export interface DeltaBarProps {
  percentageValue: number;
  isIncreasePositive?: boolean;
  tooltip?: string;
  showAnimation?: boolean;
  marginTop?: MarginTop;
}

const DeltaBar = ({
  percentageValue,
  isIncreasePositive = true,
  tooltip,
  showAnimation = true,
  marginTop = "mt-0",
}: DeltaBarProps) => {
  const deltaType = mapInputsToDeltaType(getDeltaType(percentageValue), isIncreasePositive);

  return (
    <div className={clsx("tremor-base", parseMarginTop(marginTop))}>
      <div
        className={clsx(
          "relative flex items-center w-full",
          getColorVariantsFromColorThemeValue(defaultColors.background).bgColor,
          sizing.xs.height,
          borderRadius.lg.all,
        )}
      >
        <div className="flex justify-end h-full w-1/2">
          {percentageValue < 0 ? (
            <Tooltip content={tooltip} className={tooltip ? "" : "hidden"}>
              <div
                className={clsx(colors[deltaType].bgColor, borderRadius.full.left)}
                style={{
                  width: `${Math.abs(percentageValue)}%`,
                  transition: showAnimation ? "all 2s" : "",
                }}
              />
            </Tooltip>
          ) : null}
        </div>
        <div
          className={clsx(
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
            <Tooltip content={tooltip} className={tooltip ? "" : "hidden"}>
              <div
                className={clsx(colors[deltaType].bgColor, borderRadius.full.right)}
                style={{
                  width: `${Math.abs(percentageValue)}%`,
                  transition: showAnimation ? "all 2s" : "",
                }}
              />
            </Tooltip>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DeltaBar;
