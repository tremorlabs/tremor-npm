"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

import { BaseColors, borderRadius, getColorClassNames, makeClassName, sizing } from "lib";
import { Color } from "../../../lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";

const makeRangeBarClassName = makeClassName("RangeBar");

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
    markerTooltip,
    rangeTooltip,
    showAnimation = true,
    color = BaseColors.Blue,
    className,
    ...other
  } = props;

  const { tooltipProps: markerTooltipProps, getReferenceProps: getMarkerReferenceProps } =
    useTooltip();
  const { tooltipProps: rangeTooltipProps, getReferenceProps: getRangeReferenceProps } =
    useTooltip();

  return (
    <div
      ref={ref}
      className={twMerge(
        makeRangeBarClassName("root"),
        "relative flex items-center w-full",
        getColorClassNames(DEFAULT_COLOR, colorPalette.lightBackground).bgColor,
        sizing.xs.height,
        borderRadius.lg.all,
        className,
      )}
      {...other}
    >
      <Tooltip text={rangeTooltip} {...rangeTooltipProps} />
      <div
        ref={rangeTooltipProps.refs.setReference}
        className={twMerge(
          makeRangeBarClassName("rangeBar"),
          "absolute h-full",
          getColorClassNames(DEFAULT_COLOR, colorPalette.background).bgColor,
          borderRadius.lg.all,
        )}
        style={{
          left: `${minPercentageValue}%`,
          width: `${maxPercentageValue - minPercentageValue}%`,
          transition: showAnimation ? "all 2s" : "",
        }}
        {...getRangeReferenceProps}
      />
      <Tooltip text={markerTooltip} {...markerTooltipProps} />
      <div
        ref={markerTooltipProps.refs.setReference}
        className={twMerge(
          makeRangeBarClassName("markerWrapper"),
          "absolute right-1/2 -translate-x-1/2",
          sizing.lg.width, // wide transparent wrapper for tooltip activation
        )}
        style={{
          left: `${percentageValue}%`,
          transition: showAnimation ? "all 2s" : "",
        }}
        {...getMarkerReferenceProps}
      >
        <div
          className={twMerge(
            makeRangeBarClassName("marker"),
            "ring-2 mx-auto",
            getColorClassNames(color, colorPalette.background).bgColor,
            getColorClassNames("white").ringColor,
            sizing.md.height,
            sizing.twoXs.width,
            borderRadius.lg.all,
          )}
        />
      </div>
    </div>
  );
});

RangeBar.displayName = "RangeBar";

export default RangeBar;
