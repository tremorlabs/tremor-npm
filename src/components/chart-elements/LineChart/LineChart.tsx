"use client";
import React, { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as ReChartsLineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AxisDomain } from "recharts/types/util/types";

import { constructCategoryColors, getYAxisDomain } from "../common/utils";
import NoData from "../common/NoData";
import BaseChartProps from "../common/BaseChartProps";
import ChartLegend from "components/chart-elements/common/ChartLegend";
import ChartTooltip from "../common/ChartTooltip";
import DeltaCalculationProps from "components/chart-elements/common/DeltaCalculationProps";
import DeltaCalculationReferenceShape from "components/chart-elements/common/DeltaCalculationReferenceShape";

import {
  BaseColors,
  colorPalette,
  defaultValueFormatter,
  getColorClassNames,
  themeColorRange,
  tremorTwMerge,
} from "lib";
import { CurveType } from "../../../lib/inputTypes";

export interface LineChartProps extends BaseChartProps {
  curveType?: CurveType;
  connectNulls?: boolean;
}

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>((props, ref) => {
  const {
    data = [],
    categories = [],
    index,
    colors = themeColorRange,
    valueFormatter = defaultValueFormatter,
    startEndOnly = false,
    showXAxis = true,
    showYAxis = true,
    yAxisWidth = 56,
    animationDuration = 900,
    showAnimation = true,
    showTooltip = true,
    showLegend = true,
    showGridLines = true,
    autoMinValue = false,
    curveType = "linear",
    minValue,
    maxValue,
    connectNulls = false,
    allowDecimals = true,
    enableDeltaCalculation = false,
    noDataText,
    className,
    ...other
  } = props;
  const [deltaCalculation, setDeltaCalculation] = useState<DeltaCalculationProps>({});

  const [legendHeight, setLegendHeight] = useState(60);
  const categoryColors = constructCategoryColors(categories, colors);

  const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);

  return (
    <div ref={ref} className={tremorTwMerge("w-full h-80", className)} {...other}>
      <ResponsiveContainer className="h-full w-full select-none">
        {data?.length ? (
          <ReChartsLineChart
            data={data}
            onMouseDown={(e) => enableDeltaCalculation && setDeltaCalculation({ leftArea: e })}
            onMouseMove={(e) =>
              enableDeltaCalculation &&
              deltaCalculation.leftArea &&
              setDeltaCalculation((prev) => ({ ...prev, rightArea: e }))
            }
            onMouseUp={() => setDeltaCalculation({})}
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
              interval="preserveStartEnd"
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
                // ongoing issue: https://github.com/recharts/recharts/issues/2920
                wrapperStyle={{ outline: "none" }}
                isAnimationActive={false}
                cursor={{
                  stroke: "#d1d5db",
                  strokeWidth:
                    deltaCalculation.leftArea?.activeLabel &&
                    deltaCalculation.rightArea?.activeLabel
                      ? 0
                      : 1,
                }}
                content={({ active, payload, label }) => (
                  <ChartTooltip
                    active={active}
                    payload={payload}
                    label={label}
                    valueFormatter={valueFormatter}
                    categoryColors={categoryColors}
                    deltaCalculation={deltaCalculation}
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
              <Line
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
                  if (payload[index] === deltaCalculation?.leftArea?.activeLabel) {
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
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                isAnimationActive={showAnimation}
                animationDuration={animationDuration}
                connectNulls={connectNulls}
              />
            ))}
            {deltaCalculation.leftArea?.activeLabel && deltaCalculation.rightArea?.activeLabel ? (
              <ReferenceArea
                x1={deltaCalculation.leftArea.activeLabel}
                x2={deltaCalculation.rightArea.activeLabel}
                fillOpacity={0.2}
                shape={({ x, y, width, height }) => (
                  <DeltaCalculationReferenceShape x={x} y={y} width={width} height={height} />
                )}
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

LineChart.displayName = "LineChart";

export default LineChart;
