"use client";
import { Color, tremorTwMerge } from "lib";
import React from "react";

import { Bar, BarChart as ReChartsBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import NoData from "components/chart-elements/common/NoData";
import { constructCategoryColors, getYAxisDomain } from "components/chart-elements/common/utils";
import { themeColorRange } from "lib";
import { AxisDomain } from "recharts/types/util/types";
import BaseSparkChartProps from "../common/BaseSparkChartProps";
import { fillColors } from "../common/style";

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
    autoMinValue = false,
    minValue,
    maxValue,
    className,
    ...other
  } = props;
  const categoryColors = constructCategoryColors(categories, colors);
  const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);

  return (
    <div ref={ref} className={tremorTwMerge("h-12 w-28", className)} {...other}>
      <ResponsiveContainer className="h-full w-full">
        {data?.length ? (
          <ReChartsBarChart
            data={data}
            stackOffset={relative ? "expand" : "none"}
            margin={{ top: 0, left: -1.5, right: -1.5, bottom: 0 }}
          >
            <YAxis hide domain={yAxisDomain as AxisDomain} />
            <XAxis hide dataKey={index} />
            {categories.map((category) => {
              const color = categoryColors.get(category) as Color;
              return (
                <Bar
                  key={category}
                  name={category}
                  type="linear"
                  stackId={stack || relative ? "a" : undefined}
                  dataKey={category}
                  fill=""
                  isAnimationActive={showAnimation}
                  animationDuration={animationDuration}
                  className={color ? fillColors[color] : "gray"}
                />
              );
            })}
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
