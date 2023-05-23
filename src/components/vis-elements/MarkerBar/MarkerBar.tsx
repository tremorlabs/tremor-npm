"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

import { BaseColors, borderRadius, getColorClassNames, makeClassName, sizing } from "lib";
import { Color } from "../../../lib";
import { colorPalette } from "lib/theme";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";

const makeMarkerBarClassName = makeClassName("MarkerBar");

export interface MarkerBarProps extends React.HTMLAttributes<HTMLDivElement> {
  percentageValue: number;
  color?: Color;
  tooltip?: string;
  showAnimation?: boolean;
}

const MarkerBar = React.forwardRef<HTMLDivElement, MarkerBarProps>((props, ref) => {
  const {
    percentageValue,
    color = BaseColors.Blue,
    tooltip,
    showAnimation = true,
    className,
    ...other
  } = props;

  const primaryBgColor = getColorClassNames(color, colorPalette.background).bgColor;
  const secondaryBgColor = getColorClassNames(color, colorPalette.lightBackground).bgColor;

  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <>
      <Tooltip text={tooltip} {...tooltipProps} />
      <div
        ref={ref}
        className={twMerge(
          makeMarkerBarClassName("root"),
          "relative flex items-center w-full",
          secondaryBgColor,
          sizing.xs.height,
          borderRadius.lg.all,
          className,
        )}
        {...other}
      >
        <div
          ref={tooltipProps.refs.setReference}
          className={twMerge(
            makeMarkerBarClassName("markerWrapper"),
            "absolute right-1/2 -translate-x-1/2",
            sizing.lg.width, // wide transparent wrapper for tooltip activation
          )}
          style={{
            left: `${percentageValue}%`,
            transition: showAnimation ? "all 2s" : "",
          }}
          {...getReferenceProps}
        >
          <div
            className={twMerge(
              makeMarkerBarClassName("marker"),
              "ring-2 mx-auto",
              primaryBgColor,
              getColorClassNames("white").ringColor,
              sizing.md.height,
              sizing.twoXs.width,
              borderRadius.lg.all,
            )}
          />
        </div>
      </div>
    </>
  );
});

MarkerBar.displayName = "MarkerBar";

export default MarkerBar;
