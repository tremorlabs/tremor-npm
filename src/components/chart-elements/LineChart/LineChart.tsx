import React, { useState } from "react";
import clsx from "clsx";
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

import {
  defaultValueFormatter,
  getColor,
  getHexFromColorThemeValue,
  getPixelsFromTwClassName,
  parseHeight,
  parseMarginTop,
  themeColorRange,
} from "lib";
import { AxisDomain } from "recharts/types/util/types";

const LineChart = ({
  data = [],
  categories = [],
  dataKey,
  colors = themeColorRange,
  valueFormatter = defaultValueFormatter,
  startEndOnly = false,
  showXAxis = true,
  showYAxis = true,
  yAxisWidth = "w-14",
  showAnimation = true,
  showTooltip = true,
  showLegend = true,
  showGridLines = true,
  height = "h-80",
  marginTop = "mt-0",
  autoMinValue = false,
  minValue,
  maxValue,
}: BaseChartProps) => {
  const [legendHeight, setLegendHeight] = useState(60);
  const categoryColors = constructCategoryColors(categories, colors);

  const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);

  return (
    <div className={clsx("tremor-base tr-w-full", parseHeight(height), parseMarginTop(marginTop))}>
      <ResponsiveContainer width="100%" height="100%">
        <ReChartsLineChart data={data}>
          {showGridLines ? (
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          ) : null}
          <XAxis
            hide={!showXAxis}
            dataKey={dataKey}
            interval="preserveStartEnd"
            tick={{ transform: "translate(0, 6)" }}
            ticks={startEndOnly ? [data[0][dataKey], data[data.length - 1][dataKey]] : undefined}
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
            width={getPixelsFromTwClassName(yAxisWidth)}
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
              type="linear"
              dataKey={category}
              stroke={getHexFromColorThemeValue(getColor(categoryColors.get(category)).background)}
              strokeWidth={2}
              dot={false}
              isAnimationActive={showAnimation}
            />
          ))}
        </ReChartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
