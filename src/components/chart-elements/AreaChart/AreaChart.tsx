"use client";
import React, { useState } from "react";
import {
  Area,
  CartesianGrid,
  Legend,
  AreaChart as ReChartsAreaChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AxisDomain } from "recharts/types/util/types";

import { constructCategoryColors, getYAxisDomain } from "../common/utils";
import BaseChartProps from "../common/BaseChartProps";
import ChartLegend from "../common/ChartLegend";
import ChartTooltip from "../common/ChartTooltip";
import NoData from "../common/NoData";

import {
  BaseColors,
  defaultValueFormatter,
  themeColorRange,
  colorPalette,
  getColorClassNames,
  tremorTwMerge,
} from "lib";
import { CurveType } from "../../../lib/inputTypes";
import RangeProps from "components/chart-elements/common/RangeProps";
import RangeReferenceShape from "components/chart-elements/common/RangeReferenceShape";

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
    animationDuration = 900,
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
    noDataText,
    className,
    ...other
  } = props;
  const [range, setRange] = useState<RangeProps>({});
  const [legendHeight, setLegendHeight] = useState(60);
  const categoryColors = constructCategoryColors(categories, colors);

  const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);

  return (
    <div ref={ref} className={tremorTwMerge("w-full h-80", className)} {...other}>
      <ResponsiveContainer className="h-full w-full select-none">
        {data?.length ? (
          <ReChartsAreaChart
            data={data}
            onMouseDown={(e) => setRange({ leftArea: e })}
            onMouseMove={(e) => range.leftArea && setRange((prev) => ({ ...prev, rightArea: e }))}
            onMouseUp={() => setRange({})}
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
                horizontal={true}
                vertical={false}
              />
            ) : null}
            <XAxis
              hide={!showXAxis}
              dataKey={index}
              tick={{ transform: "translate(0, 6)" }}
              ticks={startEndOnly ? [data[0][index], data[data.length - 1][index]] : undefined}
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
              tickFormatter={valueFormatter}
              allowDecimals={allowDecimals}
            />
            {showTooltip ? (
              <Tooltip
                wrapperStyle={{ outline: "none" }}
                isAnimationActive={false}
                cursor={{
                  stroke: "#d1d5db",
                  strokeWidth: range.leftArea?.activeLabel && range.rightArea?.activeLabel ? 0 : 1,
                }}
                content={({ active, payload, label }) => (
                  <ChartTooltip
                    active={active}
                    payload={payload}
                    label={label}
                    valueFormatter={valueFormatter}
                    categoryColors={categoryColors}
                    range={range}
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
                      <stop offset="5%" stopColor="currentColor" stopOpacity={0.4} />
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
                      <stop stopColor="currentColor" stopOpacity={0.3} />
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
                activeDot={{
                  className: tremorTwMerge(
                    "stroke-tremor-background dark:stroke-dark-tremor-background",
                    getColorClassNames(
                      categoryColors.get(category) ?? BaseColors.Gray,
                      colorPalette.text,
                    ).fillColor,
                  ),
                }}
                dot={(props) => {
                  const {
                    payload,
                    width,
                    height,
                    cx,
                    cy,
                    stroke,
                    strokeLinecap,
                    strokeLinejoin,
                    strokeWidth,
                  } = props;
                  if (payload[index] === range?.leftArea?.activeLabel) {
                    return (
                      <svg width={width} height={height}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={4}
                          stroke={stroke}
                          strokeLinecap={strokeLinecap}
                          strokeLinejoin={strokeLinejoin}
                          strokeWidth={strokeWidth}
                          className={tremorTwMerge(
                            "stroke-tremor-background dark:stroke-dark-tremor-background",
                            getColorClassNames(
                              categoryColors.get(category) ?? BaseColors.Gray,
                              colorPalette.text,
                            ).fillColor,
                          )}
                        />
                      </svg>
                    );
                  }

                  return <></>;
                }}
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
              />
            ))}
            {range.leftArea?.activeLabel && range.rightArea?.activeLabel ? (
              <ReferenceArea
                x1={range.leftArea.activeLabel}
                x2={range.rightArea.activeLabel}
                fillOpacity={0.2}
                shape={({ x, y, width, height }) => (
                  <RangeReferenceShape x={x} y={y} width={width} height={height} />
                )}
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
