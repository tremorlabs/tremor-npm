"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

import { BaseColors, borderRadius, colorClassNames, sizing } from "lib";
import { Color } from "../../../lib";
import { colorPalette, WHITE } from "lib/theme";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";

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

  const primaryBgColor = colorClassNames[color][colorPalette.background].bgColor;
  const secondaryBgColor = colorClassNames[color][colorPalette.lightBackground].bgColor;

  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <>
      <Tooltip text={tooltip} {...tooltipProps} />
      <div
        ref={ref}
        className={twMerge(
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
              "ring-2 mx-auto",
              primaryBgColor,
              colorClassNames[WHITE]["none"].ringColor,
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

export default MarkerBar;
