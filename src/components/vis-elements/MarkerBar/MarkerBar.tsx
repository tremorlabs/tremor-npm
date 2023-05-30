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
        // common
        "relative flex items-center w-full",
        // light
        "rounded-tremor-full bg-tremor-background-subtle",
        // dark
        "dark:rounded-dark-tremor-full dark:bg-dark-tremor-background-subtle",
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
              // common
              "absolute h-full",
              // light
              "rounded-tremor-full bg-tremor-content-subtle",
              // dark
              "dark:rounded-dark-tremor-full dark:bg-dark-tremor-content-subtle",
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
            // common
            "ring-2 mx-auto",
            // light
            "rounded-tremor-full ring-tremor-brand-inverted bg-tremor-brand",
            // dark
            "dark:rounded-dark-tremor-full dark:ring-dark-tremor-brand-inverted dark:bg-dark-tremor-brand",
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
