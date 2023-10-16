"use client";
import React, { useState } from "react";
import {
  Area,
  AreaChart as ReChartsAreaChart,
  Line,
  ResponsiveContainer,
  ReferenceLine,
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

export interface SparkAreaChartProps extends BaseSparkChartProps {
  stack?: boolean;
  curveType?: CurveType;
  connectNulls?: boolean;
}

const AreaChart = React.forwardRef<HTMLDivElement, SparkAreaChartProps>((props, ref) => {
  const {
    data = [],
    categories = [],
    index,
    stack = false,
    colors = themeColorRange,
    showAnimation = false,
    animationDuration = 900,
    showGradient = true,
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
          <ReChartsAreaChart
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
            {categories.map((category) => {
              return (
                <defs key={category}>
                  {showGradient ? (
                    <linearGradient
                      className={
                        getColorClassNames(
                          categoryColors.get(category) ?? BaseColors.Gray,
                          colorPalette.text,
                        ).textColor
                      }
                      id={categoryColors.get(category)}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="currentColor"
                        stopOpacity={activeLegend && activeLegend !== category ? 0.15 : 0.4}
                      />
                      <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                    </linearGradient>
                  ) : (
                    <linearGradient
                      className={
                        getColorClassNames(
                          categoryColors.get(category) ?? BaseColors.Gray,
                          colorPalette.text,
                        ).textColor
                      }
                      id={categoryColors.get(category)}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        stopColor="currentColor"
                        stopOpacity={activeLegend && activeLegend !== category ? 0.1 : 0.3}
                      />
                    </linearGradient>
                  )}
                </defs>
              );
            })}
            {categories.map((category) => (
              <Area
                className={
                  getColorClassNames(
                    categoryColors.get(category) ?? BaseColors.Gray,
                    colorPalette.text,
                  ).strokeColor
                }
                strokeOpacity={activeLegend && activeLegend !== category ? 0.3 : 1}
                dot={false}
                key={category}
                name={category}
                type={curveType}
                dataKey={category}
                stroke=""
                fill={`url(#${categoryColors.get(category)})`}
                strokeWidth={1}
                strokeLinejoin="round"
                strokeLinecap="round"
                isAnimationActive={showAnimation}
                animationDuration={animationDuration}
                stackId={stack ? "a" : undefined}
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
          </ReChartsAreaChart>
        ) : (
          <NoData noDataText={noDataText} />
        )}
      </ResponsiveContainer>
    </div>
  );
});

AreaChart.displayName = "AreaChart";

export default AreaChart;
