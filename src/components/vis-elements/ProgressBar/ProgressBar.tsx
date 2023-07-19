"use client";
import React from "react";

import { getColorClassNames, makeClassName, sizing, spacing, tremorTwMerge } from "lib";
import { Color } from "../../../lib/inputTypes";
import { colorPalette } from "lib/theme";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";

const makeProgressBarClassName = makeClassName("ProgressBar");

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  label?: string;
  tooltip?: string;
  showAnimation?: boolean;
  color?: Color;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>((props, ref) => {
  const { value, label, color, tooltip, showAnimation = true, className, ...other } = props;
  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <>
      <Tooltip text={tooltip} {...tooltipProps} />
      <div
        ref={ref}
        className={tremorTwMerge(
          makeProgressBarClassName("root"),
          "flex items-center w-full",
          className,
        )}
        {...other}
      >
        <div
          ref={tooltipProps.refs.setReference}
          className={tremorTwMerge(
            makeProgressBarClassName("progressBarWrapper"),
            "relative flex items-center w-full rounded-tremor-full",
            color
              ? getColorClassNames(color, colorPalette.lightBackground).bgColor
              : "bg-tremor-brand-faint dark:bg-dark-tremor-brand-faint",
            sizing.xs.height,
          )}
          {...getReferenceProps}
        >
          <div
            className={tremorTwMerge(
              makeProgressBarClassName("progressBar"),
              // common
              "flex-col h-full rounded-tremor-full",
              color
                ? getColorClassNames(color, colorPalette.background).bgColor
                : "bg-tremor-brand dark:bg-dark-tremor-brand",
            )}
            style={{
              width: `${value}%`,
              transition: showAnimation ? "all 1s" : "",
            }}
          />
        </div>
        {label ? (
          <div
            className={tremorTwMerge(
              makeProgressBarClassName("labelWrapper"),
              // common
              "w-16 truncate text-right",
              // light
              "text-tremor-content-emphasis",
              // dark
              "dark:text-dark-tremor-content-emphasis",
              spacing.sm.marginLeft,
            )}
          >
            <p
              className={tremorTwMerge(
                makeProgressBarClassName("label"),
                // common
                "shrink-0 whitespace-nowrap truncate text-tremor-default",
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

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
