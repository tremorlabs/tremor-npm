"use client";
import React, { useState } from "react";
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
import {
  constructCategoryColors,
  hasOnlyOneValueForThisKey,
} from "components/chart-elements/common/utils";
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
    onValueChange,
    referenceLine,
    ...other
  } = props;
  const [activeLegend, setActiveLegend] = useState<string | undefined>(undefined);
  const categoryColors = constructCategoryColors(categories, colors);

  const hasOnValueChange = !!onValueChange;

  function onCategoryClick(dataKey: string) {
    if (!hasOnValueChange) return;
    if (dataKey === activeLegend || hasOnlyOneValueForThisKey(data, dataKey)) {
      setActiveLegend(undefined);
      onValueChange?.(null);
    } else {
      setActiveLegend(dataKey);
      onValueChange?.({
        eventType: "category",
        categoryClicked: dataKey,
      });
    }
  }

  return (
    <div ref={ref} className={tremorTwMerge("w-full h-80", className)} {...other}>
      <ResponsiveContainer className="h-full w-full">
        {data?.length ? (
          <ReChartsLineChart
            data={data}
            onClick={
              hasOnValueChange && activeLegend
                ? () => {
                    setActiveLegend(undefined);
                    onValueChange?.(null);
                  }
                : undefined
            }
          >
            <XAxis hide dataKey={index} />
            {categories.map((category) => (
              <Line
                className={tremorTwMerge(
                  getColorClassNames(
                    categoryColors.get(category) ?? BaseColors.Gray,
                    colorPalette.text,
                  ).strokeColor,
                )}
                strokeOpacity={activeLegend && activeLegend !== category ? 0.3 : 1}
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
            {onValueChange
              ? categories.map((category) => (
                  <Line
                    className={tremorTwMerge("cursor-pointer")}
                    strokeOpacity={0}
                    key={category}
                    name={category}
                    type={curveType}
                    dataKey={category}
                    stroke="transparent"
                    fill="transparent"
                    legendType="none"
                    tooltipType="none"
                    strokeWidth={6}
                    connectNulls={connectNulls}
                    onClick={(props: any, event) => {
                      event.stopPropagation();
                      const { name } = props;
                      onCategoryClick(name);
                    }}
                  />
                ))
              : null}
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
