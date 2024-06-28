import { BaseColors, Color, colorPalette, getColorClassNames } from "lib";
import React from "react";
import { ActiveDot } from "./types";

interface LinearGradientProps {
  category: string;
  activeDot?: ActiveDot;
  activeLegend?: string;
  colors: Map<string, Color | string>;
  showGradient?: boolean;
}

export const LinearGradient = (props: LinearGradientProps) => {
  const { category, activeDot, activeLegend, colors, showGradient } = props;
  return (
    <linearGradient
      className={
        getColorClassNames(colors.get(category) ?? BaseColors.Gray, colorPalette.text).textColor
      }
      id={colors.get(category)}
      x1="0"
      y1="0"
      x2="0"
      y2="1"
    >
      {showGradient ? (
        <>
          <stop
            offset="5%"
            stopColor="currentColor"
            stopOpacity={activeDot || (activeLegend && activeLegend !== category) ? 0.15 : 0.4}
          />
          <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
        </>
      ) : (
        <stop
          stopColor="currentColor"
          stopOpacity={activeDot || (activeLegend && activeLegend !== category) ? 0.1 : 0.3}
        />
      )}
    </linearGradient>
  );
};
