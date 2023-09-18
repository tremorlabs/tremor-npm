"use client";
import React, { useState } from "react";
import {
  CartesianGrid,
  Dot,
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

interface ActiveDot {
  index?: number;
  dataKey?: string;
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
  const [activeDot, setActiveDot] = useState<ActiveDot | undefined>(undefined);
  const [activeLegend, setActiveLegend] = useState<string | undefined>(undefined);
  const categoryColors = constructCategoryColors(categories, colors);
  
  const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);

  function onDotClick(data: any, event: React.MouseEvent) {
    event.stopPropagation();

    if (!onValueChange) return;
    if (data.index === activeDot?.index && data.dataKey === activeDot?.dataKey) {
      setActiveDot(undefined);
    } else {
      setActiveDot({
        index: data.index,
        dataKey: data.dataKey,
      });
      onValueChange?.(data.payload);
    }
    setActiveLegend(undefined);
  }

  function onDataKeyClick(dataKey: string){
    if (!onValueChange) return;
    if (dataKey === activeLegend) {
      setActiveLegend(undefined);
    } else {
      setActiveLegend(dataKey);
    }
    setActiveDot(undefined);
  }

  return (
    <div ref={ref} className={tremorTwMerge("w-full h-80", className)} {...other}>
      <ResponsiveContainer className="h-full w-full">
        {data?.length ? (
          <ReChartsLineChart
            data={data}
            onClick={() => {
              setActiveDot(undefined);
              setActiveLegend(undefined);
            }}
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
                  ChartLegend(
                    { payload },
                    categoryColors,
                    setLegendHeight,
                    activeLegend,
                    (clickedLegendItem: string) => {
                        onDataKeyClick(clickedLegendItem)
                    },
                  )
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
                strokeOpacity={activeDot || (activeLegend && activeLegend !== category) ? 0.3 : 1}
                activeDot={(props: any) => {
                  const { cx, cy, stroke, strokeLinecap, strokeLinejoin, strokeWidth, dataKey } =
                    props;
                  return (
                    <Dot
                      onClick={(dotProps: any, event) => onDotClick(props, event)}
                      cx={cx}
                      cy={cy}
                      r={5}
                      fill=""
                      stroke={stroke}
                      strokeLinecap={strokeLinecap}
                      strokeLinejoin={strokeLinejoin}
                      strokeWidth={strokeWidth}
                      className={tremorTwMerge(
                        "stroke-tremor-background dark:stroke-dark-tremor-background",
                        onValueChange ? "cursor-pointer" : "",
                        getColorClassNames(
                          categoryColors.get(dataKey) ?? BaseColors.Gray,
                          colorPalette.text,
                        ).fillColor,
                      )}
                    />
                  );
                }}
                dot={(props: any) => {
                  const {
                    stroke,
                    strokeLinecap,
                    strokeLinejoin,
                    strokeWidth,
                    cx,
                    cy,
                    dataKey,
                    index,
                  } = props;

                  if (activeDot?.index === index && activeDot?.dataKey === category) {
                    return (
                      <Dot
                        cx={cx}
                        cy={cy}
                        r={5}
                        stroke={stroke}
                        fill=""
                        strokeLinecap={strokeLinecap}
                        strokeLinejoin={strokeLinejoin}
                        strokeWidth={strokeWidth}
                        className={tremorTwMerge(
                          "stroke-tremor-background dark:stroke-dark-tremor-background",
                          onValueChange ? "cursor-pointer" : "",
                          getColorClassNames(
                            categoryColors.get(dataKey) ?? BaseColors.Gray,
                            colorPalette.text,
                          ).fillColor,
                        )}
                      />
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
                onClick={(props: any, event) => {
                    event.stopPropagation();
                    const {name} = props
                    onDataKeyClick(name)
                }}
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
