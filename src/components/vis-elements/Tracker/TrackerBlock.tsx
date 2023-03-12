import React from "react";
import { twMerge } from "tailwind-merge";

import { Color } from "../../../lib/inputTypes";
import { borderRadius, getColorClassNames, mergeRefs } from "lib";
import { colorPalette } from "lib/theme";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { makeTrackerClassName } from "./Tracker";

export interface TrackerBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  color: Color;
  tooltip?: string;
}

const TrackerBlock = React.forwardRef<HTMLDivElement, TrackerBlockProps>((props, ref) => {
  const { color, tooltip, className, ...other } = props;

  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <div
      ref={mergeRefs([ref, tooltipProps.refs.setReference])}
      className={twMerge(
        makeTrackerClassName("trackingBlock"),
        "w-full h-full",
        getColorClassNames(color, colorPalette.background).bgColor,
        borderRadius.md.all,
        className,
      )}
      {...other}
      {...getReferenceProps}
    >
      <Tooltip text={tooltip} {...tooltipProps} />
    </div>
  );
});

export default TrackerBlock;
