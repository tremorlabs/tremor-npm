import React from "react";
import { twMerge } from "tailwind-merge";

import { makeClassName, spacing } from "lib";
import { Color } from "../../../lib/inputTypes";
import TrackerBlock from "./TrackerBlock";

export const makeTrackerClassName = makeClassName("Tracker");

export interface TrackerBlockProps {
  key?: string;
  color?: Color;
  tooltip?: string;
}

export interface TrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TrackerBlockProps[];
}

const Tracker = React.forwardRef<HTMLDivElement, TrackerProps>((props, ref) => {
  const { data = [], className, ...other } = props;
  return (
    <div
      ref={ref}
      className={twMerge(
        makeTrackerClassName("root"),
        "w-full flex items-center h-10",
        spacing.threeXs.spaceX,
        className,
      )}
      {...other}
    >
      {data.map((item, idx) => (
        <TrackerBlock key={item.key ?? idx} color={item.color ?? "gray"} tooltip={item.tooltip} />
      ))}
    </div>
  );
});

export default Tracker;
