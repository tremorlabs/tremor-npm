"use client";
import React from "react";

import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { getColorClassNames, makeClassName, tremorTwMerge } from "lib";
import { colorPalette } from "lib/theme";
import { Color } from "../../../lib";

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
    showAnimation = false,
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
        "rounded-tremor-full relative flex h-2 w-full items-center",
        // light
        "bg-tremor-background-subtle",
        // dark
        "dark:bg-dark-tremor-background-subtle",
        className,
      )}
      {...other}
    >
      {minValue !== undefined && maxValue !== undefined ? (
        <>
          <Tooltip text={rangeTooltip} {...rangeTooltipProps} />
          <div
            ref={rangeTooltipProps.refs.setReference}
            className={tremorTwMerge(
              makeMarkerBarClassName("rangeBar"),
              // common
              "rounded-tremor-full absolute h-full",
              // light
              "bg-tremor-content-subtle",
              // dark
              "dark:bg-dark-tremor-content-subtle",
            )}
            style={{
              left: `${minValue}%`,
              width: `${maxValue - minValue}%`,
              transition: showAnimation ? "all duration-300" : "",
            }}
            {...getRangeReferenceProps}
          />
        </>
      ) : null}
      <Tooltip text={markerTooltip} {...markerTooltipProps} />
      <div
        ref={markerTooltipProps.refs.setReference}
        className={tremorTwMerge(
          makeMarkerBarClassName("markerWrapper"),
          "absolute right-1/2 w-5 -translate-x-1/2",
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
            "rounded-tremor-full mx-auto h-4 w-1 ring-2",
            "ring-tremor-brand-inverted",
            "dark:ring-dark-tremor-brand-inverted",
            color
              ? getColorClassNames(color, colorPalette.background).bgColor
              : "dark:bg-dark-tremor-brand bg-tremor-brand",
          )}
        />
      </div>
    </div>
  );
});

MarkerBar.displayName = "MarkerBar";

export default MarkerBar;
