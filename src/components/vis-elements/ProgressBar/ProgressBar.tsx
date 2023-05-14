"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

import {
  BaseColors,
  borderRadius,
  fontSize,
  fontWeight,
  getColorClassNames,
  makeClassName,
  sizing,
  spacing,
} from "lib";
import { Color } from "../../../lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";

const makeProgressBarClassName = makeClassName("ProgressBar");

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  percentageValue: number;
  label?: string;
  tooltip?: string;
  showAnimation?: boolean;
  color?: Color;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>((props, ref) => {
  const {
    percentageValue,
    label,
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
        className={twMerge(makeProgressBarClassName("root"), "flex items-center w-full", className)}
        {...other}
      >
        <div
          ref={tooltipProps.refs.setReference}
          className={twMerge(
            makeProgressBarClassName("progressBarWrapper"),
            "relative flex items-center w-full",
            secondaryBgColor,
            sizing.xs.height,
            borderRadius.lg.all,
          )}
          {...getReferenceProps}
        >
          <div
            className={twMerge(
              makeProgressBarClassName("progressBar"),
              primaryBgColor,
              "flex-col h-full",
              borderRadius.lg.all,
            )}
            style={{
              width: `${percentageValue}%`,
              transition: showAnimation ? "all 2s" : "",
            }}
          />
        </div>
        {label ? (
          <div
            className={twMerge(
              makeProgressBarClassName("labelWrapper"),
              "w-16 truncate text-right",
              getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor,
              spacing.sm.marginLeft,
            )}
          >
            <p
              className={twMerge(
                makeProgressBarClassName("label"),
                "shrink-0 whitespace-nowrap truncate",
                fontSize.sm,
                fontWeight.sm,
              )}
            >
              {label}
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
});

export default ProgressBar;
