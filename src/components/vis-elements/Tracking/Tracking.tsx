import React from "react";
import { twMerge } from "tailwind-merge";

import { makeClassName, spacing } from "lib";
import { Color } from "../../../lib/inputTypes";
import TrackingBlock from "./TrackingBlock";

export const makeTrackingClassName = makeClassName("Tracking");

export interface TrackingBlockProps {
  key?: string;
  color?: Color;
  tooltip?: string;
}

export interface TrackingProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TrackingBlockProps[];
}

const Tracking = React.forwardRef<HTMLDivElement, TrackingProps>((props, ref) => {
  const { data, children, className, ...other } = props;
  return (
    <div
      ref={ref}
      className={twMerge(
        makeTrackingClassName("root"),
        "w-full flex items-center h-10",
        spacing.threeXs.spaceX,
        className,
      )}
      {...other}
    >
      {children ??
        data.map((item, idx) => (
          <TrackingBlock
            key={item.key ?? idx}
            color={item.color ?? "gray"}
            tooltip={item.tooltip}
          />
        ))}
    </div>
  );
});

export default Tracking;
