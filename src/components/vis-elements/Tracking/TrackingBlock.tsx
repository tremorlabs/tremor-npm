"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

import { Color } from "../../../lib/inputTypes";
import { borderRadius, colorClassNames, mergeRefs } from "lib";
import { colorPalette } from "lib/theme";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";

export interface TrackingBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  color: Color;
  tooltip?: string;
}

const TrackingBlock = React.forwardRef<HTMLDivElement, TrackingBlockProps>((props, ref) => {
  const { color, tooltip, className, ...other } = props;

  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <div
      ref={mergeRefs([ref, tooltipProps.refs.setReference])}
      className={twMerge(
        "w-full h-full",
        colorClassNames[color][colorPalette.background].bgColor,
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

export default TrackingBlock;
