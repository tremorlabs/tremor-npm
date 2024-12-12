"use client";
import React from "react";
import { Area, AreaChart as ReChartsAreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import NoData from "components/chart-elements/common/NoData";
import { constructCategoryColors, getYAxisDomain } from "components/chart-elements/common/utils";
import { strokeColors, textColors, themeColorRange, tremorTwMerge } from "lib";
import { AxisDomain } from "recharts/types/util/types";
import { Color, CurveType } from "../../../lib/inputTypes";
import BaseSparkChartProps from "../common/BaseSparkChartProps";

interface SparkAreaChartProps extends BaseSparkChartProps {
  stack?: boolean;
  curveType?: CurveType;
  connectNulls?: boolean;
  showGradient?: boolean;
}

const SparkAreaChart = React.forwardRef<HTMLDivElement, SparkAreaChartProps>((props, ref) => {
  const {
    data = [],
    categories = [],
    index,
    stack = false,
    colors = themeColorRange,
    showAnimation = false,
    animationDuration = 600,
    showGradient = true,
    curveType = "linear",
    connectNulls = false,
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
          <ReChartsAreaChart data={data} margin={{ top: 1, left: 1, right: 1, bottom: 1 }}>
            <YAxis hide domain={yAxisDomain as AxisDomain} />
            <XAxis hide dataKey={index} />
            {categories.map((category) => {
              const color = categoryColors.get(category) as Color;
              return (
                <defs key={category}>
                  {showGradient ? (
                    <linearGradient
                      className={color ? textColors[color] : "gray"}
                      id={categoryColors.get(category)}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="currentColor" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                    </linearGradient>
                  ) : (
                    <linearGradient
                      className={color ? textColors[color] : "gray"}
                      id={categoryColors.get(category)}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop stopColor="currentColor" stopOpacity={0.3} />
                    </linearGradient>
                  )}
                </defs>
              );
            })}
            {categories.map((category) => {
              const color = categoryColors.get(category) as Color;
              return (
                <Area
                  strokeOpacity={1}
                  dot={false}
                  key={category}
                  name={category}
                  type={curveType}
                  dataKey={category}
                  stroke=""
                  fill={`url(#${categoryColors.get(category)})`}
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  isAnimationActive={showAnimation}
                  animationDuration={animationDuration}
                  stackId={stack ? "a" : undefined}
                  connectNulls={connectNulls}
                  className={color ? strokeColors[color] : "gray"}
                />
              );
            })}
          </ReChartsAreaChart>
        ) : (
          <NoData noDataText={noDataText} />
        )}
      </ResponsiveContainer>
    </div>
  );
});

SparkAreaChart.displayName = "SparkAreaChart";

export { SparkAreaChart, type SparkAreaChartProps };
