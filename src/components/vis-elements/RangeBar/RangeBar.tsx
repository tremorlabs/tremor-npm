import React from "react";
import clsx from "clsx";
import "tippy.js/dist/tippy.css";
import Tooltip from "@tippyjs/react";

import {
  BaseColors,
  borderRadius,
  defaultColors,
  getColor,
  getColorVariantsFromColorThemeValue,
  parseMarginTop,
  sizing,
} from "lib";
import { Color, MarginTop } from "../../../lib";

export interface RangeBarProps {
  percentageValue: number;
  minPercentageValue: number;
  maxPercentageValue: number;
  markerTooltip?: string;
  rangeTooltip?: string;
  showAnimation?: boolean;
  color?: Color;
  marginTop?: MarginTop;
}

const RangeBar = ({
  percentageValue,
  minPercentageValue,
  maxPercentageValue,
  markerTooltip,
  rangeTooltip,
  showAnimation = true,
  color = BaseColors.Blue,
  marginTop = "mt-0",
}: RangeBarProps) => {
  return (
    <div
      className={clsx(
        "tremor-base relative flex items-center w-full",
        parseMarginTop(marginTop),
        getColorVariantsFromColorThemeValue(defaultColors.lightBackground).bgColor,
        sizing.xs.height,
        borderRadius.lg.all,
      )}
    >
      <Tooltip content={rangeTooltip} className={rangeTooltip ? "" : "hidden"}>
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
      </Tooltip>
      <Tooltip content={markerTooltip} className={markerTooltip ? "" : "hidden"}>
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
      </Tooltip>
    </div>
  );
};

export default RangeBar;
