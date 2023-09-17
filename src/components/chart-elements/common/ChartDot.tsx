import React from "react";
import { BaseColors, colorPalette, getColorClassNames, tremorTwMerge } from "lib";
import { Dot } from "recharts";

const ChartDot = (props: any) => {
  const {
    stroke,
    strokeLinecap,
    strokeLinejoin,
    strokeWidth,
    cx,
    cy,
    dataKey,
    index,
    clickedPointIndex,
    clickedPointCategory,
    categoryColors,
  } = props;

  if (clickedPointIndex === index && clickedPointCategory === dataKey) {
    return (
      <Dot
        cx={cx}
        cy={cy}
        r={4}
        stroke={stroke}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        strokeWidth={strokeWidth}
        className={tremorTwMerge(
          "stroke-tremor-background dark:stroke-dark-tremor-background",
          getColorClassNames(categoryColors.get(dataKey) ?? BaseColors.Gray, colorPalette.text)
            .fillColor,
        )}
      />
    );
  }
};

export default ChartDot;
