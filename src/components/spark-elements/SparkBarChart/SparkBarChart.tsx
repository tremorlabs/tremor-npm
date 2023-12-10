"use client";
import { colorPalette, getColorClassNames, tremorTwMerge } from "lib";
import React from "react";

import { Bar, BarChart as ReChartsBarChart, ResponsiveContainer, XAxis } from "recharts";

import { BaseColors, themeColorRange } from "lib";
import BaseSparkChartProps from "../common/BaseSparkChartProps";
import { constructCategoryColors } from "components/chart-elements/common/utils";
import NoData from "components/chart-elements/common/NoData";

export interface SparkBarChartProps extends BaseSparkChartProps {
  stack?: boolean;
  relative?: boolean;
}

const SparkBarChart = React.forwardRef<HTMLDivElement, SparkBarChartProps>((props, ref) => {
  const {
    data = [],
    categories = [],
    index,
    colors = themeColorRange,
    stack = false,
    relative = false,
    animationDuration = 900,
    showAnimation = false,
    noDataText,
    className,
    ...other
  } = props;
  const categoryColors = constructCategoryColors(categories, colors);

  return (
    <div ref={ref} className={tremorTwMerge("w-28 h-12", className)} {...other}>
      <ResponsiveContainer className="h-full w-full">
        {data?.length ? (
          <ReChartsBarChart
            data={data}
            stackOffset={relative ? "expand" : "none"}
            margin={{ top: 0, left: -1.5, right: -1.5, bottom: 0 }}
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
