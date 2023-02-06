import React from "react";
import clsx from "clsx";
import "tippy.js/dist/tippy.css";
import Tooltip from "@tippyjs/react";

import { Color, Height } from "../../../lib";
import { borderRadius, getColor, getColorVariantsFromColorThemeValue, parseHeight } from "lib";

export interface TrackingBlockProps {
  color: Color;
  height?: Height;
  tooltip?: string;
}

const TrackingBlock = ({ color, height = "h-10", tooltip }: TrackingBlockProps) => {
  return (
    <Tooltip content={tooltip} className={tooltip ? "" : "hidden"}>
      <div
        className={clsx(
          "w-full",
          getColorVariantsFromColorThemeValue(getColor(color).background).bgColor,
          parseHeight(height),
          borderRadius.md.all,
        )}
      />
    </Tooltip>
  );
};

export default TrackingBlock;
