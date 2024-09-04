"use client";
import React, { useState } from "react";
import {
  CartesianGrid,
  Dot,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart as ReChartsScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
  Label,
} from "recharts";
import { AxisDomain } from "recharts/types/util/types";

import type { EventProps } from "components/chart-elements/common";
import ChartLegend from "components/chart-elements/common/ChartLegend";
import ScatterChartTooltip from "components/chart-elements/ScatterChart/ScatterChartTooltip";
import BaseAnimationTimingProps from "../common/BaseAnimationTimingProps";
import NoData from "../common/NoData";
import {
  constructCategories,
  constructCategoryColors,
  deepEqual,
  getYAxisDomain,
} from "../common/utils";

import { CustomTooltipProps } from "components/chart-elements/common/CustomTooltipProps";
import {
  BaseColors,
  colorPalette,
  defaultValueFormatter,
  getColorClassNames,
  themeColorRange,
  tremorTwMerge,
} from "lib";
import { Color, ValueFormatter, IntervalType } from "../../../lib/inputTypes";
import { DataLabelOptions } from "../common/BaseChartProps";

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
  category?: string;
  size?: string;
  valueFormatter?: ScatterChartValueFormatter;
  sizeRange?: number[];
  colors?: (Color | string)[];
  showOpacity?: boolean;
  startEndOnly?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showXAxisLine?: boolean;
  showYAxisLine?: boolean;
  yAxisWidth?: number;
  intervalType?: IntervalType;
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
  enableLegendSlider?: boolean;
  onValueChange?: (value: EventProps) => void;
  customTooltip?: React.ComponentType<CustomTooltipProps>;
  rotateLabelX?: {
    angle: number;
    verticalShift: number;
    xAxisHeight: number;
  };
  tickGap?: number;
  dataLabelOptions?: Record<string, DataLabelOptions>;
  xAxisLabel?: string;
  yAxisLabel?: string;
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
    showXAxisLine = false,
    showYAxisLine = false,
    yAxisWidth = 56,
    intervalType = "equidistantPreserveStart",
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
    rotateLabelX,
    className,
    enableLegendSlider = false,
    tickGap = 5,
    dataLabelOptions,
    xAxisLabel,
    yAxisLabel,
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

      // set active legends and categoryClicked state only if category is not undefined (ie there are categories to click!)
      if (category) {
        setActiveLegend(data.payload[category]);
        onValueChange?.({
          eventType: "bubble",
          categoryClicked: data.payload[category],
          ...data.payload,
        });
      } else {
        onValueChange?.({
          eventType: "bubble",
          ...data.payload,
        });
      }
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
            margin={{
              bottom: xAxisLabel ? 20 : undefined,
              left: 20,
              right: 20,
              top: 5,
            }}
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
                interval={startEndOnly ? "preserveStartEnd" : intervalType}
                tick={{ transform: "translate(0, 6)" }}
                ticks={startEndOnly ? [data[0][x], data[data.length - 1][x]] : undefined}
                type="number"
                name={x}
                fill=""
                stroke={showXAxisLine ? "gray" : ""}
                strokeOpacity={0.2}
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
                axisLine={showXAxis && showXAxisLine}
                minTickGap={tickGap}
                domain={xAxisDomain as AxisDomain}
                allowDataOverflow={true}
                angle={rotateLabelX?.angle}
                dy={rotateLabelX?.verticalShift}
                height={rotateLabelX?.xAxisHeight}
              >
                {xAxisLabel && (
                  <Label
                    position="insideBottom"
                    offset={-20}
                    className="fill-tremor-content-emphasis text-tremor-default font-medium dark:fill-dark-tremor-content-emphasis"
                  >
                    {xAxisLabel}
                  </Label>
                )}
              </XAxis>
            ) : null}
            {y ? (
              <YAxis
                width={yAxisWidth}
                hide={!showYAxis}
                axisLine={showYAxis && showYAxisLine}
                tickLine={false}
                dataKey={y}
                type="number"
                name={y}
                domain={yAxisDomain as AxisDomain}
                tick={{ transform: "translate(-3, 0)" }}
                tickFormatter={valueFormatter.y}
                fill=""
                stroke={showYAxisLine ? "gray" : ""}
                strokeOpacity={0.2}
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
              >
                {yAxisLabel && (
                  <Label
                    position="insideLeft"
                    style={{ textAnchor: "middle" }}
                    angle={-90}
                    offset={-15}
                    className="fill-tremor-content-emphasis text-tremor-default font-medium dark:fill-dark-tremor-content-emphasis"
                  >
                    {yAxisLabel}
                  </Label>
                )}
              </YAxis>
            ) : null}
            <Tooltip
              wrapperStyle={{ outline: "none" }}
              isAnimationActive={false}
              cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
              content={
                showTooltip ? (
                  ({ active, payload, label }) => {
                    const color = category ? payload?.[0]?.payload?.[category] : label;
                    return CustomTooltip ? (
                      <CustomTooltip
                        payload={payload?.map((payloadItem) => ({
                          ...payloadItem,
                          color:
                            categoryColors.get(color) ??
                            categoryColors.get("cat_1") ??
                            BaseColors.Gray,
                        }))}
                        active={active}
                        label={color}
                      />
                    ) : (
                      <ScatterChartTooltip
                        active={active}
                        payload={payload}
                        label={color}
                        valueFormatter={valueFormatter}
                        axis={{ x: x, y: y, size: size }}
                        category={category}
                        categoryColors={categoryColors}
                      />
                    );
                  }
                ) : (
                  <></>
                )
              }
            />
            {size ? <ZAxis dataKey={size} type="number" range={sizeRange} name={size} /> : null}
            {category ? (
              categories?.map((cat) => {
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
                    label={
                      dataLabelOptions?.[category] == null
                        ? undefined
                        : {
                            style: {
                              fontSize: `${dataLabelOptions?.[category].fontSize ?? 12}px`,
                              fontWeight: "300",
                              fill: categoryColors.get(category) ?? BaseColors.Gray,
                              stroke: "#000",
                              strokeWidth: 0.3,
                            },
                            position: dataLabelOptions[category].position ?? "top",
                            offset: dataLabelOptions?.[category].offset ?? 10,
                            angle: dataLabelOptions?.[category].angle ?? 0,
                          }
                    }
                    name={cat}
                    data={category ? data.filter((d) => d[category] === cat) : data}
                    isAnimationActive={showAnimation}
                    animationDuration={animationDuration}
                    shape={(props: any) => renderShape(props, activeNode, activeLegend)}
                    onClick={onNodeClick}
                  />
                );
              })
            ) : (
              <Scatter
                className={tremorTwMerge(
                  getColorClassNames(
                    categoryColors.get("cat_1") ?? BaseColors.Gray,
                    colorPalette.text,
                  ).fillColor,
                  showOpacity
                    ? getColorClassNames(
                        categoryColors.get("cat_1") ?? BaseColors.Gray,
                        colorPalette.text,
                      ).strokeColor
                    : "",
                  onValueChange ? "cursor-pointer" : "",
                )}
                fill={`url(#000000)`}
                fillOpacity={showOpacity ? 0.7 : 1}
                // label={
                //   dataLabelOptions?.[category] == null
                //     ? undefined
                //     : {
                //         style: {
                //           fontSize: `${dataLabelOptions?.[category].fontSize ?? 12}px`,
                //           fontWeight: "300",
                //           fill: categoryColors.get(category) ?? BaseColors.Gray,
                //           stroke: "#000",
                //           strokeWidth: 0.3,
                //         },
                //         position: dataLabelOptions[category].position ?? "top",
                //         offset: dataLabelOptions?.[category].offset ?? 10,
                //         angle: dataLabelOptions?.[category].angle ?? 0,
                //       }
                // }
                // name={cat}
                data={data}
                isAnimationActive={showAnimation}
                animationDuration={animationDuration}
                shape={(props: any) => renderShape(props, activeNode, activeLegend)}
                onClick={onNodeClick}
              />
            )}
            {showLegend && category ? (
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
                    enableLegendSlider,
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
