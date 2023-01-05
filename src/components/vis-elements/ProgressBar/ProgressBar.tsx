import React from "react";

import "tippy.js/dist/tippy.css";
import Tooltip from "@tippyjs/react";

import {
  BaseColors,
  borderRadius,
  classNames,
  defaultColors,
  fontSize,
  fontWeight,
  getColorTheme,
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
  const primaryBgColor = getColorVariantsFromColorThemeValue(
    getColorTheme(color).background
  ).bgColor;
  const secondaryBgColor = getColorVariantsFromColorThemeValue(
    getColorTheme(color).lightBackground
  ).bgColor;
  return (
    <div
      className={classNames(
        "tremor-base tr-flex tr-items-center tr-w-full",
        parseMarginTop(marginTop)
      )}
    >
      <div
        className={classNames(
          "tr-relative tr-flex tr-items-center tr-w-full",
          secondaryBgColor,
          sizing.xs.height,
          borderRadius.lg.all
        )}
      >
        <Tooltip content={tooltip} className={tooltip ? "" : "tr-hidden"}>
          <div
            className={classNames(
              primaryBgColor,
              "tr-flex-col tr-h-full",
              borderRadius.lg.all
            )}
            style={{
              width: `${percentageValue}%`,
              transition: showAnimation ? "all 2s" : "",
            }}
          />
        </Tooltip>
      </div>
      {label ? (
        <div
          className={classNames(
            "tr-w-16 tr-truncate tr-text-right",
            getColorVariantsFromColorThemeValue(defaultColors.darkText)
              .textColor,
            spacing.sm.marginLeft
          )}
        >
          <p
            className={classNames(
              "text-elem tr-shrink-0 tr-whitespace-nowrap tr-truncate",
              fontSize.sm,
              fontWeight.sm
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
