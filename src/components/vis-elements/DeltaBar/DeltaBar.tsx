"use client";
import { tremorTwMerge } from "lib";
import React from "react";

import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { DeltaTypes, makeClassName, mapInputsToDeltaType, sizing } from "lib";
import { colors } from "./styles";

const makeDeltaBarClassName = makeClassName("DeltaBar");

const getDeltaType = (value: number) => (value >= 0 ? DeltaTypes.Increase : DeltaTypes.Decrease);

export interface DeltaBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  isIncreasePositive?: boolean;
  tooltip?: string;
  showAnimation?: boolean;
}

const DeltaBar = React.forwardRef<HTMLDivElement, DeltaBarProps>((props, ref) => {
  const {
    value,
    isIncreasePositive = true,
    showAnimation = false,
    className,
    tooltip,
    ...other
  } = props;
  const deltaType = mapInputsToDeltaType(getDeltaType(value), isIncreasePositive);

  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <>
      <Tooltip text={tooltip} {...tooltipProps} />
      <div
        ref={ref}
        className={tremorTwMerge(
          makeDeltaBarClassName("root"),
          // common
          "relative flex items-center w-full rounded-tremor-full",
          // light
          "bg-tremor-background-subtle",
          // dark
          "dark:bg-dark-tremor-background-subtle",
          sizing.xs.height,
          className,
        )}
        {...other}
      >
        <div
          className={
            (makeDeltaBarClassName("negativeDeltaBarWrapper"), "flex justify-end h-full w-1/2")
          }
        >
          {value < 0 ? (
            <div
              ref={tooltipProps.refs.setReference}
              className={tremorTwMerge(
                makeDeltaBarClassName("negativeDeltaBar"),
                // common
                "rounded-l-tremor-full",
                colors[deltaType].bgColor,
              )}
              style={{
                width: `${Math.abs(value)}%`,
                transition: showAnimation ? "all 1s" : "",
              }}
              {...getReferenceProps}
            />
          ) : null}
        </div>
        <div
          className={tremorTwMerge(
            makeDeltaBarClassName("separator"),
            // common
            "ring-2 z-10 rounded-tremor-full",
            // light
            "ring-tremor-brand-inverted bg-tremor-background-emphasis",
            // dark
            "dark:ring-dark-tremor-brand-inverted dark:bg-dark-tremor-background-emphasis",
            sizing.md.height,
            sizing.twoXs.width,
          )}
        />
        <div
          className={tremorTwMerge(
            makeDeltaBarClassName("positiveDeltaBarWrapper"),
            "flex justify-start h-full w-1/2",
          )}
        >
          {value >= 0 ? (
            <div
              ref={tooltipProps.refs.setReference}
              className={tremorTwMerge(
                makeDeltaBarClassName("positiveDeltaBar"),
                // common
                "rounded-r-tremor-full",
                colors[deltaType].bgColor,
              )}
              style={{
                width: `${Math.abs(value)}%`,
                transition: showAnimation ? "all 1s" : "",
              }}
              {...getReferenceProps}
            />
          ) : null}
        </div>
      </div>
    </>
  );
});

DeltaBar.displayName = "DeltaBar";

export default DeltaBar;
