"use client";
import React, { useState } from "react";
import { tremorTwMerge } from "lib";
import {
  Area,
  CartesianGrid,
  Legend,
  AreaChart as ReChartsAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { constructCategoryColors, getYAxisDomain } from "../common/utils";
import BaseChartProps from "../common/BaseChartProps";
import ChartLegend from "../common/ChartLegend";
import ChartTooltip from "../common/ChartTooltip";

import { BaseColors, defaultValueFormatter, hexColors, themeColorRange } from "lib";
import { CurveType } from "../../../lib/inputTypes";
import { AxisDomain } from "recharts/types/util/types";

export interface AreaChartProps extends BaseChartProps {
  stack?: boolean;
  curveType?: CurveType;
  connectNulls?: boolean;
}

const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>((props, ref) => {
  const {
    data = [],
    categories = [],
    index,
    stack = false,
    colors = themeColorRange,
    valueFormatter = defaultValueFormatter,
    startEndOnly = false,
    showXAxis = true,
    showYAxis = true,
    yAxisWidth = 56,
    showAnimation = true,
    showTooltip = true,
    showLegend = true,
    showGridLines = true,
    showGradient = true,
    autoMinValue = false,
    curveType = "linear",
    minValue,
    maxValue,
    connectNulls = false,
    allowDecimals = true,
    className,
    ...other
  } = props;
  const [legendHeight, setLegendHeight] = useState(60);
  const categoryColors = constructCategoryColors(categories, colors);

  const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);

  return (
    <div ref={ref} className={tremorTwMerge("w-full h-80", className)} {...other}>
      <ResponsiveContainer className="h-full w-full">
        <ReChartsAreaChart data={data}>
          {showGridLines ? (
            <CartesianGrid
              className="stroke-1 stroke-tremor-content-muted"
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
            />
          ) : null}
          <XAxis
            className="" // @severin @achi
            hide={!showXAxis}
            dataKey={index}
            tick={{ transform: "translate(0, 6)" }}
            ticks={startEndOnly ? [data[0][index], data[data.length - 1][index]] : undefined}
            style={{
              fontSize: "12px",
              fontFamily: "Inter; Helvetica",
            }}
            interval="preserveStartEnd"
            tickLine={false}
            axisLine={false}
            padding={{ left: 10, right: 10 }}
            minTickGap={5}
          />
          <YAxis
            width={yAxisWidth}
            hide={!showYAxis}
            axisLine={false}
            tickLine={false}
            type="number"
            domain={yAxisDomain as AxisDomain}
            tick={{ transform: "translate(-3, 0)" }}
            style={{
              fontSize: "12px",
              fontFamily: "Inter; Helvetica",
            }}
            tickFormatter={valueFormatter}
            allowDecimals={allowDecimals}
          />
          {showTooltip ? (
            <Tooltip
              wrapperStyle={{ outline: "none" }}
              isAnimationActive={false}
              cursor={{ stroke: "#d1d5db", strokeWidth: 1 }} // @achi theming how?
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
          {categories.map((category) => {
            const hexColor = hexColors[categoryColors.get(category) ?? BaseColors.Gray];
            return (
              <defs key={category}>
                {showGradient ? (
                  <linearGradient id={categoryColors.get(category)} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={hexColor} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={hexColor} stopOpacity={0} />
                  </linearGradient>
                ) : (
                  <linearGradient id={categoryColors.get(category)} x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor={hexColor} stopOpacity={0.3} />
                  </linearGradient>
                )}
              </defs>
            );
          })}
          {categories.map((category) => (
            <Area
              key={category}
              name={category}
              type={curveType}
              dataKey={category}
              stroke={hexColors[categoryColors.get(category) ?? BaseColors.Gray]}
              fill={`url(#${categoryColors.get(category)})`}
              className="stroke-2" //strokeWidth={2}
              dot={false}
              isAnimationActive={showAnimation}
              animationDuration={1100}
              stackId={stack ? "a" : undefined}
              connectNulls={connectNulls}
            />
          ))}
        </ReChartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
});

export default AreaChart;
