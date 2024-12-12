"use client";
import React from "react";

import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { bgColors, tremorTwMerge } from "lib";
import { Color } from "../../../lib";

interface MarkerBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  minValue?: number;
  maxValue?: number;
  markerTooltip?: string;
  rangeTooltip?: string;
  showAnimation?: boolean;
  color?: Color;
}

const MarkerBar = React.forwardRef<HTMLDivElement, MarkerBarProps>(
  (
    {
      value,
      minValue,
      maxValue,
      markerTooltip,
      rangeTooltip,
      showAnimation = false,
      color = "brand",
      className,
      ...other
    },
    ref,
  ) => {
    const { tooltipProps: markerTooltipProps, getReferenceProps: getMarkerReferenceProps } =
      useTooltip();
    const { tooltipProps: rangeTooltipProps, getReferenceProps: getRangeReferenceProps } =
      useTooltip();

    return (
      <div
        ref={ref}
        className={tremorTwMerge(
          "rounded-tremor-full bg-tremor-background-subtle relative flex h-2 w-full items-center",
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
                "rounded-tremor-full bg-tremor-content-subtle absolute h-full",
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
          className={tremorTwMerge("absolute right-1/2 w-5 -translate-x-1/2")}
          style={{
            left: `${value}%`,
            transition: showAnimation ? "all 1s" : "",
          }}
          {...getMarkerReferenceProps}
        >
          <div
            className={tremorTwMerge(
              "rounded-tremor-full ring-tremor-brand-inverted mx-auto h-4 w-1 ring-2",
              bgColors[color as Color],
            )}
          />
        </div>
      </div>
    );
  },
);

MarkerBar.displayName = "MarkerBar";

export { MarkerBar, type MarkerBarProps };
