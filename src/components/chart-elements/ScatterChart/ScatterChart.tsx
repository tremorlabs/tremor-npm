"use client";
import React, { useState } from "react";
import {
  ScatterChart as ReChartsScatterChart,
  Scatter,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { AxisDomain } from "recharts/types/util/types";

import { constructCategories, constructCategoryColors, getYAxisDomain } from "../common/utils";
import NoData from "../common/NoData";
import BaseAnimationTimingProps from "../common/BaseAnimationTimingProps";
import ChartLegend from "components/chart-elements/common/ChartLegend";
import ScatterChartTooltip from "components/chart-elements/ScatterChart/ScatterChartTooltip";

import {
  BaseColors,
  colorPalette,
  defaultValueFormatter,
  getColorClassNames,
  themeColorRange,
  tremorTwMerge,
} from "lib";
import { Color, ValueFormatter } from "../../../lib/inputTypes";

export type ScatterChartValueFormatter = {
  x?: ValueFormatter;
  y?: ValueFormatter;
  size?: ValueFormatter;
};

export interface ScatterChartProps
  extends BaseAnimationTimingProps,
    React.HTMLAttributes<HTMLDivElement> {
  data: any[];
  x: string;
  y: string;
  category: string;
  size?: string;
  valueFormatter?: ScatterChartValueFormatter;
  sizeRange?: number[];
  colors?: Color[];
  showOpacity?: boolean;
  startEndOnly?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  yAxisWidth?: number;
  showTooltip?: boolean;
  showLegend?: boolean;
  showGridLines?: boolean;
  autoMinXValue?: boolean;
  minXValue?: number;
  maxXValue?: number;
  autoMinYValue?: boolean;
  minYValue?: number;
  maxYValue?: number;
  allowDecimals?: boolean;
  noDataText?: string;
  xAxisProps?: any;
  yAxisProps?: any;
  zAxisProps?: any;
}

const ScatterChart = React.forwardRef<HTMLDivElement, ScatterChartProps>((props, ref) => {
  const {
    data = [],
    x,
    y,
    size,
    category,
    colors = themeColorRange,
    showOpacity = false,
    sizeRange = [1, 1000],
    valueFormatter = {
      x: defaultValueFormatter,
      y: defaultValueFormatter,
      size: defaultValueFormatter,
    },
    startEndOnly = false,
    showXAxis = true,
    showYAxis = true,
    yAxisWidth = 56,
    animationDuration = 900,
    showAnimation = true,
    showTooltip = true,
    showLegend = true,
    showGridLines = true,
    autoMinXValue = false,
    minXValue,
    maxXValue,
    autoMinYValue = false,
    minYValue,
    maxYValue,
    allowDecimals = true,
    xAxisProps = {},
    yAxisProps = {},
    zAxisProps = {},
    noDataText,
    className,
    ...other
  } = props;
  const [legendHeight, setLegendHeight] = useState(60);

  const categories = constructCategories(data, category);
  const categoryColors = constructCategoryColors(categories, colors);

  //maybe rename getYAxisDomain to getAxisDomain
  const xAxisDomain = getYAxisDomain(autoMinXValue, minXValue, maxXValue);
  const yAxisDomain = getYAxisDomain(autoMinYValue, minYValue, maxYValue);

  return (
    <div ref={ref} className={tremorTwMerge("w-full h-80", className)} {...other}>
      <ResponsiveContainer className="h-full w-full">
        {data?.length ? (
          <ReChartsScatterChart>
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
                horizontal={true}
                vertical={true}
              />
            ) : null}
            {x ? (
              <XAxis
                hide={!showXAxis}
                dataKey={x}
                interval="preserveStartEnd"
                tick={{ transform: "translate(0, 6)" }}
                ticks={startEndOnly ? [data[0][x], data[data.length - 1][x]] : undefined}
                type="number"
                name={x}
                // fill=""
                // stroke=""
                className={tremorTwMerge(
                  // common
                  "text-tremor-label",
                  // light
                  "fill-tremor-content",
                  // dark
                  "dark:fill-dark-tremor-content",
                )}
                tickLine={false}
                tickFormatter={valueFormatter.x}
                axisLine={false}
                padding={{ left: 0, right: 0 }}
                minTickGap={5}
                domain={xAxisDomain as AxisDomain}
                allowDataOverflow={true}
                {...xAxisProps}
              />
            ) : null}
            {y ? (
              <YAxis
                width={yAxisWidth}
                hide={!showYAxis}
                axisLine={false}
                tickLine={false}
                dataKey={y}
                type="number"
                name={y}
                domain={yAxisDomain as AxisDomain}
                tick={{ transform: "translate(-3, 0)" }}
                tickFormatter={valueFormatter.y}
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
                allowDecimals={allowDecimals}
                allowDataOverflow={true}
                {...yAxisProps}
              />
            ) : null}
            {showTooltip ? (
              <Tooltip
                wrapperStyle={{ outline: "none" }}
                isAnimationActive={false}
                cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
                content={({ active, payload, label }) => (
                  <ScatterChartTooltip
                    active={active}
                    payload={payload}
                    label={category ? payload?.[0]?.payload?.[category] : label}
                    valueFormatter={valueFormatter}
                    axis={{ x: x, y: y, size: size }}
                    category={category}
                    categoryColors={categoryColors}
                  />
                )}
              />
            ) : null}
            {size ? <ZAxis dataKey={size} type="number" range={sizeRange} name={size} {...zAxisProps} /> : null}
            {categories.map((cat) => {
              return (
                <Scatter
                  className={`
                ${
                  getColorClassNames(categoryColors.get(cat) ?? BaseColors.Gray, colorPalette.text)
                    .fillColor
                } 
                ${
                  showOpacity
                    ? getColorClassNames(
                        categoryColors.get(cat) ?? BaseColors.Gray,
                        colorPalette.text,
                      ).strokeColor
                    : ""
                }
              `}
                  fill={`url(#${categoryColors.get(cat)})`}
                  fillOpacity={showOpacity ? 0.7 : 1}
                  key={cat}
                  name={cat}
                  data={category ? data.filter((d) => d[category] === cat) : data}
                  isAnimationActive={showAnimation}
                  animationDuration={animationDuration}
                />
              );
            })}
            {showLegend ? (
              <Legend
                verticalAlign="top"
                height={legendHeight}
                content={({ payload }) => ChartLegend({ payload }, categoryColors, setLegendHeight)}
              />
            ) : null}
          </ReChartsScatterChart>
        ) : (
          <NoData noDataText={noDataText} />
        )}
      </ResponsiveContainer>
    </div>
  );
});

ScatterChart.displayName = "ScatterChart";

export default ScatterChart;
