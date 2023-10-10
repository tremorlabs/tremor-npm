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
  Dot,
} from "recharts";
import { AxisDomain } from "recharts/types/util/types";

import {
  constructCategories,
  constructCategoryColors,
  deepEqual,
  getYAxisDomain,
} from "../common/utils";
import NoData from "../common/NoData";
import BaseAnimationTimingProps from "../common/BaseAnimationTimingProps";
import type { EventProps } from "components/chart-elements/common";
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
import { CustomTooltipType } from "components/chart-elements/common/CustomTooltipProps";

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
  onValueChange?: (value: EventProps) => void;
  customTooltip?: React.ComponentType<CustomTooltipType>;
}

const renderShape = (props: any, activeNode: any | undefined, activeLegend: string | undefined) => {
  const { cx, cy, width, node, fillOpacity, name } = props;

  return (
    <Dot
      cx={cx}
      cy={cy}
      r={width / 2}
      opacity={
        activeNode || (activeLegend && activeLegend !== name)
          ? deepEqual(activeNode, node)
            ? fillOpacity
            : 0.3
          : fillOpacity
      }
    />
  );
};

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
    showAnimation = false,
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
    noDataText,
    onValueChange,
    customTooltip,
    className,
    ...other
  } = props;
  const CustomTooltip = customTooltip;
  const [legendHeight, setLegendHeight] = useState(60);
  const [activeNode, setActiveNode] = React.useState<any | undefined>(undefined);
  const [activeLegend, setActiveLegend] = useState<string | undefined>(undefined);
  const hasOnValueChange = !!onValueChange;

  function onNodeClick(data: any, index: number, event: React.MouseEvent) {
    event.stopPropagation();
    if (!hasOnValueChange) return;
    if (deepEqual(activeNode, data.node)) {
      setActiveLegend(undefined);
      setActiveNode(undefined);
      onValueChange?.(null);
    } else {
      setActiveNode(data.node);
      setActiveLegend(data.payload[category]);
      onValueChange?.({
        eventType: "bubble",
        categoryClicked: data.payload[category],
        ...data.payload,
      });
    }
  }

  function onCategoryClick(dataKey: string) {
    if (!hasOnValueChange) return;
    if (dataKey === activeLegend && !activeNode) {
      setActiveLegend(undefined);
      onValueChange?.(null);
    } else {
      setActiveLegend(dataKey);
      onValueChange?.({
        eventType: "category",
        categoryClicked: dataKey,
      });
    }
    setActiveNode(undefined);
  }

  const categories = constructCategories(data, category);
  const categoryColors = constructCategoryColors(categories, colors);

  //maybe rename getYAxisDomain to getAxisDomain
  const xAxisDomain = getYAxisDomain(autoMinXValue, minXValue, maxXValue);
  const yAxisDomain = getYAxisDomain(autoMinYValue, minYValue, maxYValue);

  return (
    <div ref={ref} className={tremorTwMerge("w-full h-80", className)} {...other}>
      <ResponsiveContainer className="h-full w-full">
        {data?.length ? (
          <ReChartsScatterChart
            onClick={
              hasOnValueChange && (activeLegend || activeNode)
                ? () => {
                    setActiveNode(undefined);
                    setActiveLegend(undefined);
                    onValueChange?.(null);
                  }
                : undefined
            }
          >
            {showGridLines ? (
              <CartesianGrid
                className={tremorTwMerge(
                  // common
                  "stroke-1",
                  // light
                  "stroke-tremor-border",
                  // dark
                  "dark:stroke-dark-tremor-border",
                )}
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
                tickFormatter={valueFormatter.x}
                axisLine={false}
                padding={{ left: 0, right: 0 }}
                minTickGap={5}
                domain={xAxisDomain as AxisDomain}
                allowDataOverflow={true}
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
              />
            ) : null}
            <Tooltip
              wrapperStyle={{ outline: "none" }}
              isAnimationActive={false}
              cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
              content={
                showTooltip ? (
                  ({ active, payload, label }) =>
                    CustomTooltip ? (
                      <CustomTooltip
                        payload={payload?.map((payloadItem) => ({
                          ...payloadItem,
                          color:
                            categoryColors.get(
                              category ? payload?.[0]?.payload?.[category] : label,
                            ) ?? BaseColors.Gray,
                        }))}
                        active={active}
                        label={category ? payload?.[0]?.payload?.[category] : label}
                      />
                    ) : (
                      <ScatterChartTooltip
                        active={active}
                        payload={payload}
                        label={category ? payload?.[0]?.payload?.[category] : label}
                        valueFormatter={valueFormatter}
                        axis={{ x: x, y: y, size: size }}
                        category={category}
                        categoryColors={categoryColors}
                      />
                    )
                ) : (
                  <></>
                )
              }
            />
            {size ? <ZAxis dataKey={size} type="number" range={sizeRange} name={size} /> : null}
            {categories.map((cat) => {
              return (
                <Scatter
                  className={tremorTwMerge(
                    getColorClassNames(
                      categoryColors.get(cat) ?? BaseColors.Gray,
                      colorPalette.text,
                    ).fillColor,
                    showOpacity
                      ? getColorClassNames(
                          categoryColors.get(cat) ?? BaseColors.Gray,
                          colorPalette.text,
                        ).strokeColor
                      : "",
                    onValueChange ? "cursor-pointer" : "",
                  )}
                  fill={`url(#${categoryColors.get(cat)})`}
                  fillOpacity={showOpacity ? 0.7 : 1}
                  key={cat}
                  name={cat}
                  data={category ? data.filter((d) => d[category] === cat) : data}
                  isAnimationActive={showAnimation}
                  animationDuration={animationDuration}
                  shape={(props) => renderShape(props, activeNode, activeLegend)}
                  onClick={onNodeClick}
                />
              );
            })}
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
                    hasOnValueChange
                      ? (clickedLegendItem: string) => onCategoryClick(clickedLegendItem)
                      : undefined,
                  )
                }
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
