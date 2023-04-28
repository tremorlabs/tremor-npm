import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
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

import { constructCategoryColors, getYAxisDomain } from "../common/utils";
import BaseChartProps from "../common/BaseChartProps";
import ChartLegend from "components/chart-elements/common/ChartLegend";
import ChartTooltip from "../common/ChartTooltip";

import { BaseColors, defaultValueFormatter, hexColors, themeColorRange } from "lib";
import { CurveType } from "../../../lib/inputTypes";
import { AxisDomain } from "recharts/types/util/types";

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
    showAnimation = true,
    showTooltip = true,
    showLegend = true,
    showGridLines = true,
    autoMinValue = false,
    curveType = "linear",
    minValue,
    maxValue,
    connectNulls = false,
    className,
    ...other
  } = props;
  const [legendHeight, setLegendHeight] = useState(60);
  const categoryColors = constructCategoryColors(categories, colors);

  const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);

  return (
    <div ref={ref} className={twMerge("w-full h-80", className)} {...other}>
      <ResponsiveContainer width="100%" height="100%">
        <ReChartsLineChart data={data}>
          {showGridLines ? (
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          ) : null}
          <XAxis
            hide={!showXAxis}
            dataKey={index}
            interval="preserveStartEnd"
            tick={{ transform: "translate(0, 6)" }}
            ticks={startEndOnly ? [data[0][index], data[data.length - 1][index]] : undefined}
            style={{
              fontSize: "12px",
              fontFamily: "Inter; Helvetica",
            }}
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
              content={({ payload }) => ChartLegend({ payload }, categoryColors, setLegendHeight)}
            />
          ) : null}
          {categories.map((category) => (
            <Line
              key={category}
              name={category}
              type={curveType}
              dataKey={category}
              stroke={hexColors[categoryColors.get(category) ?? BaseColors.Gray]}
              strokeWidth={2}
              dot={false}
              isAnimationActive={showAnimation}
              connectNulls={connectNulls}
            />
          ))}
        </ReChartsLineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default LineChart;
