"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

import {
  DeltaTypes,
  borderRadius,
  getColorClassNames,
  makeClassName,
  mapInputsToDeltaType,
  sizing,
} from "lib";
import { colors } from "./styles";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";
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
        className={twMerge(
          makeDeltaBarClassName("root"),
          "relative flex items-center w-full",
          getColorClassNames(DEFAULT_COLOR, colorPalette.lightBackground).bgColor,
          sizing.xs.height,
          borderRadius.lg.all,
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
              className={twMerge(
                makeDeltaBarClassName("negativeDeltaBar"),
                colors[deltaType].bgColor,
                borderRadius.full.left,
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
          className={twMerge(
            makeDeltaBarClassName("separator"),
            "ring-2 z-10",
            getColorClassNames(DEFAULT_COLOR, colorPalette.background).bgColor,
            getColorClassNames("white").ringColor,
            sizing.md.height,
            sizing.twoXs.width,
            borderRadius.lg.all,
          )}
        />
        <div
          className={twMerge(
            makeDeltaBarClassName("positiveDeltaBarWrapper"),
            "flex justify-start h-full w-1/2",
          )}
        >
          {percentageValue >= 0 ? (
            <div
              ref={tooltipProps.refs.setReference}
              className={twMerge(
                makeDeltaBarClassName("positiveDeltaBar"),
                colors[deltaType].bgColor,
                borderRadius.full.right,
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

export default DeltaBar;
