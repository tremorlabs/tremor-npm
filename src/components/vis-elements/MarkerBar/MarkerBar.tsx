import React from "react";

import "tippy.js/dist/tippy.css";
import Tooltip from "@tippyjs/react";

import {
  BaseColors,
  borderRadius,
  classNames,
  defaultColors,
  getColorTheme,
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
  const primaryBgColor = getColorVariantsFromColorThemeValue(
    getColorTheme(color).background
  ).bgColor;
  const secondaryBgColor = getColorVariantsFromColorThemeValue(
    getColorTheme(color).lightBackground
  ).bgColor;
  return (
    <div
      className={classNames(
        "tremor-base tr-relative tr-flex tr-items-center tr-w-full",
        parseMarginTop(marginTop),
        secondaryBgColor,
        sizing.xs.height,
        borderRadius.lg.all
      )}
    >
      <Tooltip content={tooltip} className={tooltip ? "" : "tr-hidden"}>
        <div
          className={classNames(
            "tr-absolute tr-right-1/2 -tr-translate-x-1/2",
            sizing.lg.width // wide transparent wrapper for tooltip activation
          )}
          style={{
            left: `${percentageValue}%`,
            transition: showAnimation ? "all 2s" : "",
          }}
        >
          <div
            className={classNames(
              "tr-ring-2 tr-mx-auto",
              primaryBgColor,
              getColorVariantsFromColorThemeValue(defaultColors.white)
                .ringColor,
              sizing.md.height,
              sizing.twoXs.width,
              borderRadius.lg.all
            )}
          />
        </div>
      </Tooltip>
    </div>
  );
};

export default MarkerBar;
