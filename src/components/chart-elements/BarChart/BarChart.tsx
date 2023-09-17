"use client";
import React, { useState } from "react";
import { colorPalette, getColorClassNames, tremorTwMerge } from "lib";

import {
  Bar,
  CartesianGrid,
  Legend,
  BarChart as ReChartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AxisDomain } from "recharts/types/util/types";

import { constructCategoryColors, getYAxisDomain, getYAxisWidth } from "../common/utils";
import BaseChartProps from "../common/BaseChartProps";
import ChartLegend from "../common/ChartLegend";
import ChartTooltip from "../common/ChartTooltip";
import ChartYTick from "../common/ChartYTick";
import NoData from "../common/NoData";

import { BaseColors, defaultValueFormatter, themeColorRange } from "lib";

export interface BarChartProps extends BaseChartProps {
  layout?: "vertical" | "horizontal";
  stack?: boolean;
  relative?: boolean;
}

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>((props, ref) => {
  const {
    data = [],
    categories = [],
    index,
    colors = themeColorRange,
    valueFormatter = defaultValueFormatter,
    layout = "horizontal",
    stack = false,
    relative = false,
    startEndOnly = false,
    animationDuration = 900,
    showAnimation = true,
    showXAxis = true,
    showYAxis = true,
    yAxisWidth = "auto",
    showTooltip = true,
    showLegend = true,
    showGridLines = true,
    autoMinValue = false,
    minValue,
    maxValue,
    allowDecimals = true,
    noDataText,
    className,
    ...other
  } = props;
  const [legendHeight, setLegendHeight] = useState(60);
  const [widestTick, setWidestTick] = useState<number | undefined>(undefined);
  const categoryColors = constructCategoryColors(categories, colors);

  const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);
  const calculatedYAxisWidth = getYAxisWidth(
    yAxisWidth,
    widestTick
      ? relative
        ? `${(widestTick * 100).toString()} %`
        : valueFormatter(widestTick)
      : undefined,
  );

  return (
    <div ref={ref} className={tremorTwMerge("w-full h-80", className)} {...other}>
      <span>{valueFormatter(widestTick ?? 0)}</span>
      <ResponsiveContainer className="h-full w-full">
        {data?.length ? (
          <ReChartsBarChart
            data={data}
            stackOffset={relative ? "expand" : "none"}
            layout={layout === "vertical" ? "vertical" : "horizontal"}
          >
            {showGridLines ? (
              <CartesianGrid
                className={tremorTwMerge(
                  // common
                  "stroke-1",
                  // light
                  "stroke-tremor-content-subtle",
                  // dark
                  "dark:stroke-dark-tremor-content-subtle",
                )}
                strokeDasharray="3 3"
                horizontal={layout !== "vertical"}
                vertical={layout === "vertical"}
              />
            ) : null}

            {layout !== "vertical" ? (
              <XAxis
                hide={!showXAxis}
                dataKey={index}
                interval="preserveStartEnd"
                tick={{ transform: "translate(0, 6)" }} //padding between labels and axis
                ticks={startEndOnly ? [data[0][index], data[data.length - 1][index]] : undefined}
                fill=""
                stroke=""
                className={tremorTwMerge(
                  // common
                  "mt-4 text-tremor-label",
                  // light
                  "fill-tremor-content",
                  // dark
                  "dark:fill-dark-tremor-content",
                )}
                tickLine={false}
                axisLine={false}
              />
            ) : (
              <XAxis
                hide={!showXAxis}
                type="number"
                tick={{ transform: "translate(-3, 0)" }}
                domain={yAxisDomain as AxisDomain}
                fill=""
                stroke=""
                className={tremorTwMerge(
                  // common
                  "text-tremor-label",
                  // light
                  "fill-tremor-content",
                  // dark
                  "dark:fill-dark-tremor-content",
                )}
                tickLine={false}
                axisLine={false}
                tickFormatter={valueFormatter}
                padding={{ left: 10, right: 10 }}
                minTickGap={5}
                allowDecimals={allowDecimals}
              />
            )}
            {layout !== "vertical" ? (
              <YAxis
                width={calculatedYAxisWidth}
                hide={!showYAxis}
                axisLine={false}
                tickLine={false}
                type="number"
                domain={yAxisDomain as AxisDomain}
                tick={(props: any) => <ChartYTick {...props} setWidestTick={setWidestTick} />}
                fill=""
                stroke=""
                className={"text-tremor-label whitespace-nowrap"}
                tickFormatter={
                  relative ? (value: number) => `${(value * 100).toString()} %` : valueFormatter
                }
                allowDecimals={allowDecimals}
              />
            ) : (
              <YAxis
                width={calculatedYAxisWidth}
                hide={!showYAxis}
                dataKey={index}
                axisLine={false}
                tickLine={false}
                ticks={startEndOnly ? [data[0][index], data[data.length - 1][index]] : undefined}
                type="category"
                interval="preserveStartEnd"
                tick={(props: any) => <ChartYTick {...props} setWidestTick={setWidestTick} />}
                fill=""
                stroke=""
                className={"text-tremor-label whitespace-nowrap"}
              />
            )}
            {showTooltip ? (
              <Tooltip
                // ongoing issue: https://github.com/recharts/recharts/issues/2920
                wrapperStyle={{ outline: "none" }}
                isAnimationActive={false}
                cursor={{ fill: "#d1d5db", opacity: "0.15" }}
                content={({ active, payload, label }) => (
                  <ChartTooltip
                    active={active}
                    payload={payload}
                    label={label}
                    valueFormatter={valueFormatter}
                    categoryColors={categoryColors}
                  />
                )}
                position={{ y: 0 }}
              />
            ) : null}
            {showLegend ? (
              <Legend
                verticalAlign="top"
                height={legendHeight}
                content={({ payload }) => ChartLegend({ payload }, categoryColors, setLegendHeight)}
              />
            ) : null}
            {categories.map((category) => (
              <Bar
                className={
                  getColorClassNames(
                    categoryColors.get(category) ?? BaseColors.Gray,
                    colorPalette.background,
                  ).fillColor
                }
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

BarChart.displayName = "BarChart";

export default BarChart;
