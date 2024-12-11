"use client";
import { tremorTwMerge } from "lib";
import React from "react";

import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { Color, mergeRefs } from "lib";

export interface TrackerBlockProps {
  key?: string | number;
  color?: Color | string;
  tooltip?: string;
}

const trackerColors: { [color in Color]: string } = {
  brand: "bg-tremor-brand-default",
  slate: "bg-slate-500",
  gray: "bg-gray-500",
  zinc: "bg-zinc-500",
  neutral: "bg-neutral-500",
  stone: "bg-stone-500",
  red: "bg-red-500",
  orange: "bg-orange-500",
  amber: "bg-amber-500",
  yellow: "bg-yellow-500",
  lime: "bg-lime-500",
  green: "bg-green-500",
  emerald: "bg-emerald-500",
  teal: "bg-teal-500",
  cyan: "bg-cyan-500",
  sky: "bg-sky-500",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  violet: "bg-violet-500",
  purple: "bg-purple-500",
  fuchsia: "bg-fuchsia-500",
  pink: "bg-pink-500",
  rose: "bg-rose-500",
};

const TrackerBlock = React.forwardRef<HTMLDivElement, TrackerBlockProps>(
  ({ color = "gray", tooltip, ...other }, ref) => {
    const { tooltipProps, getReferenceProps } = useTooltip();
    return (
      <div
        ref={mergeRefs([ref, tooltipProps.refs.setReference])}
        className={tremorTwMerge(
          "h-full w-full rounded-[1px] first:rounded-l-[4px] last:rounded-r-[4px]",
          trackerColors[color as Color],
        )}
        {...other}
        {...getReferenceProps}
      >
        <Tooltip text={tooltip} {...tooltipProps} />
      </div>
    );
  },
);

TrackerBlock.displayName = "TrackerBlock";

interface TrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TrackerBlockProps[];
}

const Tracker = React.forwardRef<HTMLDivElement, TrackerProps>((props, ref) => {
  const { data = [], className, ...other } = props;
  return (
    <div
      ref={ref}
      className={tremorTwMerge("flex h-10 flex-nowrap items-center gap-0.5", className)}
      {...other}
    >
      {data.map((item, idx) => (
        <TrackerBlock key={item.key ?? idx} color={item.color} tooltip={item.tooltip} />
      ))}
    </div>
  );
});

Tracker.displayName = "Tracker";

export { Tracker, type TrackerProps };
