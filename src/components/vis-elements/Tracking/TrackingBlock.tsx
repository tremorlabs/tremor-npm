import React from "react";
import { twMerge } from "tailwind-merge";

import { Color } from "../../../lib";
import { borderRadius, getColor, getColorVariantsFromColorThemeValue } from "lib";

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
        getColorVariantsFromColorThemeValue(getColor(color).background).bgColor,
        borderRadius.md.all,
        className,
      )}
      {...other}
    />
  );
});

export default TrackingBlock;
