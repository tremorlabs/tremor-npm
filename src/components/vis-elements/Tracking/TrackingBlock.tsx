import React from "react";
import clsx from "clsx";

import { Color, Height } from "../../../lib";
import { borderRadius, getColor, getColorVariantsFromColorThemeValue } from "lib";

export interface TrackingBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  color: Color;
  height?: Height;
  tooltip?: string;
}

const TrackingBlock = React.forwardRef<HTMLDivElement, TrackingBlockProps>((props, ref) => {
  const { color, className, ...other } = props;
  return (
    <div
      ref={ref}
      className={clsx(
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
