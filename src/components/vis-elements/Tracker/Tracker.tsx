"use client";
import React from "react";
import { tremorTwMerge } from "lib";

import { colorPalette, makeClassName, spacing, getColorClassNames, mergeRefs } from "lib";
import { Color } from "../../../lib/inputTypes";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";

export const makeTrackerClassName = makeClassName("Tracker");

export interface TrackerBlockProps {
  key?: string | number;
  color?: Color;
  tooltip?: string;
}

const TrackerBlock = React.forwardRef<HTMLDivElement, TrackerBlockProps>((props, ref) => {
  const { color, tooltip, ...other } = props;

  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <div
      ref={mergeRefs([ref, tooltipProps.refs.setReference])}
      className={tremorTwMerge(
        makeTrackerClassName("trackingBlock"),
        "w-full h-full rounded-tremor-small",
        getColorClassNames(color ?? "gray", colorPalette.background).bgColor,
      )}
      {...other}
      {...getReferenceProps}
    >
      <Tooltip text={tooltip} {...tooltipProps} />
    </div>
  );
});

TrackerBlock.displayName = "TrackerBlock";

export interface TrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TrackerBlockProps[];
}

const Tracker = React.forwardRef<HTMLDivElement, TrackerProps>((props, ref) => {
  const { data = [], className, ...other } = props;
  return (
    <div
      ref={ref}
      className={tremorTwMerge(
        makeTrackerClassName("root"),
        "w-full flex items-center h-10",
        spacing.threeXs.spaceX,
        className,
      )}
      {...other}
    >
      {data.map((item, idx) => (
        <TrackerBlock key={item.key ?? idx} color={item.color} tooltip={item.tooltip} />
      ))}
    </div>
  );
});

Tracker.displayName = "Tracker";

export default Tracker;
