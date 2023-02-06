import React from "react";
import clsx from "clsx";
import "tippy.js/dist/tippy.css";
import Tooltip from "@tippyjs/react";

import {
  BaseColors,
  borderRadius,
  defaultColors,
  fontSize,
  fontWeight,
  getColor,
  getColorVariantsFromColorThemeValue,
  parseMarginTop,
  sizing,
  spacing,
} from "lib";
import { Color, MarginTop } from "../../../lib";

export interface ProgressBarProps {
  percentageValue: number;
  label?: string;
  tooltip?: string;
  showAnimation?: boolean;
  color?: Color;
  marginTop?: MarginTop;
}

const ProgressBar = ({
  percentageValue,
  label,
  tooltip,
  showAnimation = true,
  color = BaseColors.Blue,
  marginTop = "mt-0",
}: ProgressBarProps) => {
  const primaryBgColor = getColorVariantsFromColorThemeValue(getColor(color).background).bgColor;
  const secondaryBgColor = getColorVariantsFromColorThemeValue(
    getColor(color).lightBackground,
  ).bgColor;
  return (
    <div className={clsx("tremor-base flex items-center w-full", parseMarginTop(marginTop))}>
      <div
        className={clsx(
          "relative flex items-center w-full",
          secondaryBgColor,
          sizing.xs.height,
          borderRadius.lg.all,
        )}
      >
        <Tooltip content={tooltip} className={tooltip ? "" : "hidden"}>
          <div
            className={clsx(primaryBgColor, "flex-col h-full", borderRadius.lg.all)}
            style={{
              width: `${percentageValue}%`,
              transition: showAnimation ? "all 2s" : "",
            }}
          />
        </Tooltip>
      </div>
      {label ? (
        <div
          className={clsx(
            "w-16 truncate text-right",
            getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
            spacing.sm.marginLeft,
          )}
        >
          <p
            className={clsx(
              "text-elem shrink-0 whitespace-nowrap truncate",
              fontSize.sm,
              fontWeight.sm,
            )}
          >
            {label}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default ProgressBar;
