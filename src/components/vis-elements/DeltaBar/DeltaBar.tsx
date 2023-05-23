"use client";
import React from "react";
import { tremorTwMerge } from "lib";

import { DeltaTypes, makeClassName, mapInputsToDeltaType, sizing } from "lib";
import { colors } from "./styles";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";

const makeDeltaBarClassName = makeClassName("DeltaBar");

const getDeltaType = (value: number) => (value >= 0 ? DeltaTypes.Increase : DeltaTypes.Decrease);

export interface DeltaBarProps extends React.HTMLAttributes<HTMLDivElement> {
  percentageValue: number;
  isIncreasePositive?: boolean;
  tooltip?: string;
  showAnimation?: boolean;
}

const DeltaBar = React.forwardRef<HTMLDivElement, DeltaBarProps>((props, ref) => {
  const {
    percentageValue,
    isIncreasePositive = true,
    showAnimation = true,
    className,
    tooltip,
    ...other
  } = props;
  const deltaType = mapInputsToDeltaType(getDeltaType(percentageValue), isIncreasePositive);

  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <>
      <Tooltip text={tooltip} {...tooltipProps} />
      <div
        ref={ref}
        className={tremorTwMerge(
          makeDeltaBarClassName("root"),
          "relative flex items-center w-full rounded-tremor-full bg-tremor-background-subtle",
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
          {percentageValue < 0 ? (
            <div
              ref={tooltipProps.refs.setReference}
              className={tremorTwMerge(
                makeDeltaBarClassName("negativeDeltaBar"),
                "rounded-l-tremor-full",
                colors[deltaType].bgColor, // achi?
              )}
              style={{
                width: `${Math.abs(percentageValue)}%`,
                transition: showAnimation ? "all 2s" : "",
              }}
              {...getReferenceProps}
            />
          ) : null}
        </div>
        <div
          className={tremorTwMerge(
            makeDeltaBarClassName("separator"),
            "ring-2 z-10 rounded-tremor-full ring-tremor-brand-inverted bg-tremor-background-emphasis",
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
          {percentageValue >= 0 ? (
            <div
              ref={tooltipProps.refs.setReference}
              className={tremorTwMerge(
                makeDeltaBarClassName("positiveDeltaBar"),
                "rounded-r-tremor-full",
                colors[deltaType].bgColor,
              )}
              style={{
                width: `${Math.abs(percentageValue)}%`,
                transition: showAnimation ? "all 2s" : "",
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
