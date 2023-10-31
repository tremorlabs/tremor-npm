"use client";
import React from "react";
import { Line, LineChart as ReChartsLineChart, ResponsiveContainer, XAxis } from "recharts";

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
    ...other
  } = props;
  const categoryColors = constructCategoryColors(categories, colors);

  return (
    <div ref={ref} className={tremorTwMerge("w-28 h-12", className)} {...other}>
      <ResponsiveContainer className="h-full w-full">
        {data?.length ? (
          <ReChartsLineChart data={data} margin={{ top: 1, left: 1, right: 1, bottom: 1 }}>
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
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                isAnimationActive={showAnimation}
                animationDuration={animationDuration}
                connectNulls={connectNulls}
              />
            ))}
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
