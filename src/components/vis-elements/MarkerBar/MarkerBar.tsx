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

export interface MarkerBarProps {
  percentageValue: number;
  color?: Color;
  tooltip?: string;
  showAnimation?: boolean;
  marginTop?: MarginTop;
}

const MarkerBar = ({
  percentageValue,
  color = BaseColors.Blue,
  tooltip,
  showAnimation = true,
  marginTop = "mt-0",
}: MarkerBarProps) => {
  const primaryBgColor = getColorVariantsFromColorThemeValue(getColor(color).background).bgColor;
  const secondaryBgColor = getColorVariantsFromColorThemeValue(
    getColor(color).lightBackground,
  ).bgColor;
  return (
    <div
      className={clsx(
        "tremor-base relative flex items-center w-full",
        parseMarginTop(marginTop),
        secondaryBgColor,
        sizing.xs.height,
        borderRadius.lg.all,
      )}
    >
      <Tooltip content={tooltip} className={tooltip ? "" : "hidden"}>
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
      </Tooltip>
    </div>
  );
};

export default MarkerBar;
