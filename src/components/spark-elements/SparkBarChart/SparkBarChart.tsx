"use client";
import { colorPalette, getColorClassNames, tremorTwMerge } from "lib";
import React, { useState } from "react";

import {
  Bar,
  BarChart as ReChartsBarChart,
  ResponsiveContainer,
  ReferenceLine,
  XAxis,
} from "recharts";

import { BaseColors, themeColorRange } from "lib";
import BaseSparkChartProps from "../common/BaseSparkChartProps";
import { constructCategoryColors, deepEqual } from "components/chart-elements/common/utils";
import NoData from "components/chart-elements/common/NoData";

export interface SparkBarChartProps extends BaseSparkChartProps {
  layout?: "vertical" | "horizontal";
  stack?: boolean;
  relative?: boolean;
}

const SparkBarChart = React.forwardRef<HTMLDivElement, SparkBarChartProps>((props, ref) => {
  const {
    data = [],
    categories = [],
    index,
    colors = themeColorRange,
    layout = "horizontal",
    stack = false,
    relative = false,
    animationDuration = 900,
    showAnimation = false,
    noDataText,
    referenceLine,
    className,
    ...other
  } = props;
  const categoryColors = constructCategoryColors(categories, colors);

  return (
    <div ref={ref} className={tremorTwMerge("w-full h-80", className)} {...other}>
      <ResponsiveContainer className="h-full w-full">
        {data?.length ? (
          <ReChartsBarChart
            data={data}
            stackOffset={relative ? "expand" : "none"}
            layout={layout === "vertical" ? "vertical" : "horizontal"}
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <XAxis hide dataKey={index} />
            {categories.map((category) => (
              <Bar
                className={tremorTwMerge(
                  getColorClassNames(
                    categoryColors.get(category) ?? BaseColors.Gray,
                    colorPalette.background,
                  ).fillColor,
                )}
                key={category}
                name={category}
                type="linear"
                stackId={stack || relative ? "a" : undefined}
                dataKey={category}
                fill=""
                isAnimationActive={showAnimation}
                animationDuration={animationDuration}
              />
            ))}
            {referenceLine ? (
              <ReferenceLine
                className={tremorTwMerge(
                  // common
                  "stroke-1",
                  // light
                  "stroke-tremor-content-subtle",
                  // dark
                  "dark:stroke-dark-tremor-content-subtle",
                )}
                y={referenceLine}
                stroke=""
                strokeDasharray="3 3"
                strokeWidth={1}
              />
            ) : null}
          </ReChartsBarChart>
        ) : (
          <NoData noDataText={noDataText} />
        )}
      </ResponsiveContainer>
    </div>
  );
});

SparkBarChart.displayName = "SparkBarChart";

export default SparkBarChart;
