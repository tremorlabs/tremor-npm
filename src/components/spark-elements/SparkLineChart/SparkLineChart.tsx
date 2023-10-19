"use client";
import React from "react";
import {
  Line,
  LineChart as ReChartsLineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import { BaseColors, colorPalette, getColorClassNames, themeColorRange, tremorTwMerge } from "lib";
import { CurveType } from "../../../lib/inputTypes";
import BaseSparkChartProps from "../common/BaseSparkChartProps";
import { constructCategoryColors } from "components/chart-elements/common/utils";
import NoData from "components/chart-elements/common/NoData";

export interface SparkLineChartProps extends BaseSparkChartProps {
  curveType?: CurveType;
  connectNulls?: boolean;
}

const SparkLineChart = React.forwardRef<HTMLDivElement, SparkLineChartProps>((props, ref) => {
  const {
    data = [],
    categories = [],
    index,
    colors = themeColorRange,
    animationDuration = 900,
    showAnimation = false,
    curveType = "linear",
    connectNulls = false,
    noDataText,
    className,
    referenceLine,
    ...other
  } = props;
  const categoryColors = constructCategoryColors(categories, colors);

  return (
    <div ref={ref} className={tremorTwMerge("w-full h-80", className)} {...other}>
      <ResponsiveContainer className="h-full w-full">
        {data?.length ? (
          <ReChartsLineChart data={data} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <XAxis hide dataKey={index} />
            {categories.map((category) => (
              <Line
                className={tremorTwMerge(
                  getColorClassNames(
                    categoryColors.get(category) ?? BaseColors.Gray,
                    colorPalette.text,
                  ).strokeColor,
                )}
                strokeOpacity={1}
                dot={false}
                key={category}
                name={category}
                type={curveType}
                dataKey={category}
                stroke=""
                strokeWidth={1}
                strokeLinejoin="round"
                strokeLinecap="round"
                isAnimationActive={showAnimation}
                animationDuration={animationDuration}
                connectNulls={connectNulls}
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
          </ReChartsLineChart>
        ) : (
          <NoData noDataText={noDataText} />
        )}
      </ResponsiveContainer>
    </div>
  );
});

SparkLineChart.displayName = "SparkLineChart";

export default SparkLineChart;
