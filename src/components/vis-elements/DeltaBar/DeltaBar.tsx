import React from "react";

import "tippy.js/dist/tippy.css";
import Tooltip from "@tippyjs/react";

import {
  DeltaTypes,
  borderRadius,
  classNames,
  defaultColors,
  getColorVariantsFromColorThemeValue,
  mapInputsToDeltaType,
  parseMarginTop,
  sizing,
} from "lib";
import { MarginTop } from "../../../lib";
import { colors } from "./styles";

const getDeltaType = (value: number) =>
  value >= 0 ? DeltaTypes.Increase : DeltaTypes.Decrease;

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
  const deltaType = mapInputsToDeltaType(
    getDeltaType(percentageValue),
    isIncreasePositive
  );

  return (
    <div className={classNames("tremor-base", parseMarginTop(marginTop))}>
      <div
        className={classNames(
          "tr-relative tr-flex tr-items-center tr-w-full",
          getColorVariantsFromColorThemeValue(defaultColors.background).bgColor,
          sizing.xs.height,
          borderRadius.lg.all
        )}
      >
        <div className="tr-flex tr-justify-end tr-h-full tr-w-1/2">
          {percentageValue < 0 ? (
            <Tooltip content={tooltip} className={tooltip ? "" : "tr-hidden"}>
              <div
                className={classNames(
                  colors[deltaType].bgColor,
                  borderRadius.full.left
                )}
                style={{
                  width: `${Math.abs(percentageValue)}%`,
                  transition: showAnimation ? "all 2s" : "",
                }}
              />
            </Tooltip>
          ) : null}
        </div>
        <div
          className={classNames(
            "tr-ring-2 tr-z-10",
            getColorVariantsFromColorThemeValue(defaultColors.darkBackground)
              .bgColor,
            getColorVariantsFromColorThemeValue(defaultColors.white).ringColor,
            sizing.md.height,
            sizing.twoXs.width,
            borderRadius.lg.all
          )}
        />
        <div className="tr-flex tr-justify-start tr-h-full tr-w-1/2">
          {percentageValue >= 0 ? (
            <Tooltip content={tooltip} className={tooltip ? "" : "tr-hidden"}>
              <div
                className={classNames(
                  colors[deltaType].bgColor,
                  borderRadius.full.right
                )}
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
