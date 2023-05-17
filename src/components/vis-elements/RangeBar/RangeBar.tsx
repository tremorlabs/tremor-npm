"use client";
import React from "react";
import { tremorTwMerge } from "lib";

import { getColorClassNames, makeClassName, sizing } from "lib";
import { Color } from "../../../lib";
import { colorPalette } from "lib/theme";
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
    color,
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
      className={tremorTwMerge(
        makeRangeBarClassName("root"),
        "relative flex items-center w-full rounded-tremor-full bg-tremor-background-subtle",
        sizing.xs.height,
        className,
      )}
      {...other}
    >
      <Tooltip text={rangeTooltip} {...rangeTooltipProps} />
      <div
        ref={rangeTooltipProps.refs.setReference}
        className={tremorTwMerge(
          makeRangeBarClassName("rangeBar"),
          "absolute h-full rounded-tremor-full bg-tremor-background-emphasis",
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
        className={tremorTwMerge(
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
          className={tremorTwMerge(
            makeRangeBarClassName("marker"),
            "ring-2 mx-auto rounded-tremor-full ring-tremor-brand-inverted bg-tremor-brand",
            color && getColorClassNames(color, colorPalette.background).bgColor,
            sizing.md.height,
            sizing.twoXs.width,
          )}
        />
      </div>
    </div>
  );
});

export default RangeBar;
