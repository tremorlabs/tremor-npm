"use client";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as ReChartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AxisDomain } from "recharts/types/util/types";

import { constructCategoryColors, getYAxisDomain } from "../common/utils";
import NoData from "../common/NoData";
import BaseChartProps from "../common/BaseChartProps";
import ChartLegend from "../common/ChartLegend";
import ChartTooltip from "../common/ChartTooltip";
import ChartDot from "../common/ChartDot";

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
  onValueChange?: (value: any) => void;
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
    noDataText,
    className,
    onValueChange,
    ...other
  } = props;
  const [legendHeight, setLegendHeight] = useState(60);
  const categoryColors = constructCategoryColors(categories, colors);

  const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);

  const [hasClickedPoint, setHasClickedPoint] = useState<boolean>(false);
  const [clickedPointIndex, setClickedPointIndex] = useState<number | null>(null);
  const [clickedPointCategory, setClickedPointCategory] = useState<string | null>(null);

  useEffect(() => {
    if (hasClickedPoint) return;
    setClickedPointIndex(null);
    setClickedPointCategory(null);
  }, [hasClickedPoint]);

  const [selectedLegend, setSelectedLegend] = useState<string | null>(null);

  return (
    <div ref={ref} className={tremorTwMerge("w-full h-80", className)} {...other}>
      <ResponsiveContainer className="h-full w-full">
        {data?.length ? (
          <ReChartsLineChart data={data}>
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
                cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
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
                content={({ payload }) =>
                  ChartLegend({ payload }, categoryColors, setLegendHeight, (clickedLegendItem) => {
                    setHasClickedPoint(false);
                    if (clickedLegendItem !== selectedLegend) {
                      setSelectedLegend(clickedLegendItem);
                    } else {
                      setSelectedLegend(null);
                    }
                  })
                }
              />
            ) : null}
            {categories.map((category) => (
              <Line
                className={tremorTwMerge(
                  getColorClassNames(
                    categoryColors.get(category) ?? BaseColors.Gray,
                    colorPalette.text,
                  ).strokeColor,
                )}
                strokeOpacity={(hasClickedPoint || (selectedLegend && selectedLegend !== category)) ? 0.3 : 1}
                activeDot={{
                  className: tremorTwMerge(
                    "stroke-tremor-background dark:stroke-dark-tremor-background",
                    getColorClassNames(
                      categoryColors.get(category) ?? BaseColors.Gray,
                      colorPalette.text,
                    ).fillColor,
                  ),
                  onClick: (event, payload: any) => {
                    const index = payload.index ?? null;
                    const dataKey = payload.dataKey ?? null;
                    if (!hasClickedPoint) {
                      setClickedPointIndex(index);
                      setClickedPointCategory(dataKey);
                      setHasClickedPoint(true);
                      onValueChange?.(payload.payload);
                    } else {
                      // cancel click
                      if (index === clickedPointIndex && dataKey === clickedPointCategory) {
                        setHasClickedPoint(false);
                      }
                      // click new point
                      else {
                        setClickedPointIndex(index);
                        setClickedPointCategory(dataKey);
                        setHasClickedPoint(true);
                        onValueChange?.(payload.payload);
                      }
                    }
                  },
                }}
                dot={
                  <ChartDot
                    clickedPointIndex={clickedPointIndex}
                    clickedPointCategory={clickedPointCategory}
                    categoryColors={categoryColors}
                  />
                }
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

LineChart.displayName = "LineChart";

export default LineChart;
