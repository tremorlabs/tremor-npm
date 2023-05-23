"use client";
import React from "react";
import { tremorTwMerge } from "lib";

import { getColorClassNames, makeClassName, sizing } from "lib";
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
  const { percentageValue, color, tooltip, showAnimation = true, className, ...other } = props;

  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <>
      <Tooltip text={tooltip} {...tooltipProps} />
      <div
        ref={ref}
        className={tremorTwMerge(
          makeMarkerBarClassName("root"),
          "relative flex items-center w-full rounded-tremor-full bg-tremor-brand-faint",
          color && getColorClassNames(color, colorPalette.lightBackground).bgColor,
          sizing.xs.height,
          className,
        )}
        {...other}
      >
        <div
          ref={tooltipProps.refs.setReference}
          className={tremorTwMerge(
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
    </>
  );
});

MarkerBar.displayName = "MarkerBar";

export default MarkerBar;
