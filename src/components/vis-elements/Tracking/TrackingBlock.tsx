import React from "react";
import { twMerge } from "tailwind-merge";

import { Color, colorClassNames } from "../../../lib";
import { borderRadius } from "lib";
import { colorPalette } from "lib/theme";

export interface TrackingBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  color: Color;
  tooltip?: string;
}

const TrackingBlock = React.forwardRef<HTMLDivElement, TrackingBlockProps>((props, ref) => {
  const { color, className, ...other } = props;
  return (
    <div
      ref={ref}
      className={twMerge(
        "w-full",
        colorClassNames[color][colorPalette.background].bgColor,
        borderRadius.md.all,
        className,
      )}
      {...other}
    />
  );
});

export default TrackingBlock;
