"use client";
import React from "react";
import { tremorTwMerge } from "lib";

import { getColorClassNames, makeClassName, sizing } from "lib";
import { Color } from "../../../lib";
import { colorPalette } from "lib/theme";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";

const makeMarkerBarClassName = makeClassName("MarkerBar");

export interface MarkerBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  minValue?: number;
  maxValue?: number;
  markerTooltip?: string;
  rangeTooltip?: string;
  showAnimation?: boolean;
  color?: Color;
}

const MarkerBar = React.forwardRef<HTMLDivElement, MarkerBarProps>((props, ref) => {
  const {
    value,
    minValue,
    maxValue,
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
        makeMarkerBarClassName("root"),
        "relative flex items-center w-full rounded-tremor-full bg-tremor-background-subtle",
        sizing.xs.height,
        className,
      )}
      {...other}
    >
      {minValue && maxValue && (
        <>
          <Tooltip text={rangeTooltip} {...rangeTooltipProps} />
          <div
            ref={rangeTooltipProps.refs.setReference}
            className={tremorTwMerge(
              makeMarkerBarClassName("rangeBar"),
              "absolute h-full rounded-tremor-full bg-tremor-background-emphasis",
            )}
            style={{
              left: `${minValue}%`,
              width: `${maxValue - minValue}%`,
              transition: showAnimation ? "all 1s" : "",
            }}
            {...getRangeReferenceProps}
          />
        </>
      )}
      <Tooltip text={markerTooltip} {...markerTooltipProps} />
      <div
        ref={markerTooltipProps.refs.setReference}
        className={tremorTwMerge(
          makeMarkerBarClassName("markerWrapper"),
          "absolute right-1/2 -translate-x-1/2",
          sizing.lg.width, // wide transparent wrapper for tooltip activation
        )}
        style={{
          left: `${value}%`,
          transition: showAnimation ? "all 1s" : "",
        }}
        {...getMarkerReferenceProps}
      >
        <div
          className={tremorTwMerge(
            makeMarkerBarClassName("marker"),
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

MarkerBar.displayName = "MarkerBar";

export default MarkerBar;
