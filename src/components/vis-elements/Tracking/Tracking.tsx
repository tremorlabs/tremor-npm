import React from "react";
import { twMerge } from "tailwind-merge";

import { Color, spacing } from "lib";
import TrackingBlock from "./TrackingBlock";

export interface TrackingBlockProps {
  key?: string;
  color?: Color;
  tooltip?: string;
}

export interface TrackingProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TrackingBlockProps[];
}

const Tracking = React.forwardRef<HTMLDivElement, TrackingProps>((props, ref) => {
  const { data, className, ...other } = props;
  return (
    <div
      ref={ref}
      className={twMerge("w-full flex items-center h-10", spacing.threeXs.spaceX, className)}
      {...other}
    >
      {data.map((item, idx) => (
        <TrackingBlock key={item.key ?? idx} color={item.color ?? "gray"} tooltip={item.tooltip} />
      ))}
    </div>
  );
});

export default Tracking;
