"use client";
import React, { useState } from "react";
import {
  CartesianGrid,
  Legend,
  LineChart as ReChartsLineChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { AxisDomain } from "recharts/types/util/types";

import BaseChartProps from "../common/BaseChartProps";
import ChartLegend from "../common/ChartLegend";
import ChartTooltip from "../common/ChartTooltip";
import NoData from "../common/NoData";
import {
  constructCategoryColors,
  getYAxisDomain,
  hasOnlyOneValueForThisKey,
} from "../common/utils";

import { BaseColors, defaultValueFormatter, themeColorRange, tremorTwMerge } from "lib";
import { CurveType } from "../../../lib/inputTypes";
import { renderHorizontalXAxis } from "../common/XAxis";
import { renderLine } from "../common/Line";
import { renderHorizontalYAxis } from "../common/YAxis";

export interface LineChartProps extends BaseChartProps {
  curveType?: CurveType;
  connectNulls?: boolean;
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
    intervalType = "equidistantPreserveStart",
    animationDuration = 900,
    showAnimation = false,
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
    enableLegendSlider = false,
    customTooltip,
    rotateLabelX,
    tickGap = 5,
    xAxisLabel,
    yAxisLabel,
    xAxisConfigs = [{ orientation: "bottom" }],
    yAxisConfigs = [{ orientation: "left" }],
    ...other
  } = props;
  const CustomTooltip = customTooltip;
  const paddingValue = !showXAxis && !showYAxis ? 0 : 20;
  const [legendHeight, setLegendHeight] = useState(60);
  const [activeDot, setActiveDot] = useState<ActiveDot | undefined>(undefined);
  const [activeLegend, setActiveLegend] = useState<string | undefined>(undefined);
  const categoryColors = constructCategoryColors(categories, colors);

  const isSeriesData: boolean = data?.[0]?.data && data[0].data !== undefined;
  const seriesData = isSeriesData ? data : [{ data }];

  const hasOnValueChange = !!onValueChange;

  function onDotClick(itemData: any, event: React.MouseEvent) {
    event.stopPropagation();

    if (!hasOnValueChange) return;
    if (
      (itemData.index === activeDot?.index && itemData.dataKey === activeDot?.dataKey) ||
      (hasOnlyOneValueForThisKey(data, itemData.dataKey) &&
        activeLegend &&
        activeLegend === itemData.dataKey)
    ) {
      setActiveLegend(undefined);
      setActiveDot(undefined);
      onValueChange?.(null);
    } else {
      setActiveLegend(itemData.dataKey);
      setActiveDot({
        index: itemData.index,
        dataKey: itemData.dataKey,
      });
      onValueChange?.({
        eventType: "dot",
        categoryClicked: itemData.dataKey,
        ...itemData.payload,
      });
    }
  }

  function onCategoryClick(dataKey: string) {
    if (!hasOnValueChange) return;
    if (
      (dataKey === activeLegend && !activeDot) ||
      (hasOnlyOneValueForThisKey(data, dataKey) && activeDot && activeDot.dataKey === dataKey)
    ) {
      setActiveLegend(undefined);
      onValueChange?.(null);
    } else {
      setActiveLegend(dataKey);
      onValueChange?.({
        eventType: "category",
        categoryClicked: dataKey,
      });
    }
    setActiveDot(undefined);
  }

  const yAxisConfigsValueFormatter = yAxisConfigs.flatMap((yAxisConfig) => {
    return (
      yAxisConfig.categories?.map((c) => [c, yAxisConfig.valueFormatter ?? valueFormatter]) ?? []
    );
  });
  const yAxisValueFormatters = Object.fromEntries(
    yAxisConfigsValueFormatter.length > 0
      ? yAxisConfigsValueFormatter
      : categories.map((c, idx) => [c, yAxisConfigs[idx]?.valueFormatter ?? valueFormatter]),
  );

  return (
    <div ref={ref} className={tremorTwMerge("w-full h-80", className)} {...other}>
      <ResponsiveContainer className="h-full w-full">
        {data?.length ? (
          <ReChartsLineChart
            // This is necessary because recharts uses the length of the chart data (if provided) to slice the child (X-axis, Y-axis) data
            data={isSeriesData ? undefined : data}
            onClick={
              hasOnValueChange && (activeLegend || activeDot)
                ? () => {
                    setActiveDot(undefined);
                    setActiveLegend(undefined);
                    onValueChange?.(null);
                  }
                : undefined
            }
            margin={{
              bottom: xAxisLabel ? 30 : undefined,
              left: yAxisLabel ? 20 : undefined,
              right: yAxisLabel ? 5 : undefined,
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
                vertical={false}
              />
            ) : null}
            {xAxisConfigs.map((xAxisConfig, idx) => {
              const d = seriesData
                .filter((d) => xAxisConfig.series?.includes(d.name))
                .flatMap((d) => d.data);
              return renderHorizontalXAxis({
                key: `x-axis-${idx}`,
                padding: { left: paddingValue, right: paddingValue },
                showAxis: showXAxis,
                dataKey: index,
                startEndOnly,
                data: d.length === 0 ? seriesData[idx].data : d,
                intervalType,
                rotateLabel: rotateLabelX,
                label: xAxisLabel,
                orientation: xAxisConfig.orientation,
                xAxisId: idx,
                minTickGap: tickGap,
                xAxisCount: xAxisConfigs.length,
              });
            })}
            {yAxisConfigs.map((yAxisConfig, idx) => {
              const domain: AxisDomain = getYAxisDomain(
                yAxisConfig.autoMinValue ?? autoMinValue,
                yAxisConfig.minValue ?? minValue,
                yAxisConfig.maxValue ?? maxValue,
              );
              return renderHorizontalYAxis({
                key: `y-axis-${idx}`,
                width: yAxisWidth,
                showAxis: showYAxis,
                domain,
                valueFormatter: yAxisConfig.valueFormatter ?? valueFormatter,
                allowDecimals,
                orientation: yAxisConfig.orientation,
                yAxisId: idx,
                label: yAxisLabel,
                xAxisCount: xAxisConfigs.length,
              });
            })}
            <Tooltip
              wrapperStyle={{ outline: "none" }}
              isAnimationActive={false}
              cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
              content={
                showTooltip ? (
                  ({ active, payload, label }) =>
                    CustomTooltip ? (
                      <CustomTooltip
                        payload={payload?.map((payloadItem: any) => ({
                          ...payloadItem,
                          color: categoryColors.get(payloadItem.dataKey) ?? BaseColors.Gray,
                        }))}
                        active={active}
                        label={label}
                      />
                    ) : (
                      <ChartTooltip
                        active={active}
                        payload={payload}
                        label={label}
                        valueFormatters={yAxisValueFormatters}
                        categoryColors={categoryColors}
                        index={index}
                        xAxisCount={xAxisConfigs.length}
                      />
                    )
                ) : (
                  <></>
                )
              }
              position={{ y: 0 }}
            />

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
                    enableLegendSlider,
                  )
                }
              />
            ) : null}
            {seriesData.map((series, seriesIndex) => {
              return (
                <>
                  {categories.map((category, idx) => {
                    const yAxisId =
                      yAxisConfigs.length === 1
                        ? 0
                        : yAxisConfigs.findIndex((yAxisConfig) =>
                            yAxisConfig.categories?.includes(category),
                          );
                    const xAxisId =
                      xAxisConfigs.length === 1
                        ? 0
                        : xAxisConfigs.findIndex((xAxisConfig) =>
                            xAxisConfig.series?.includes(series.name),
                          );
                    const dataRange = series.data
                      .filter((d: any) => d[category])
                      .map((d: any) => ({
                        [index]: d[index],
                        [category]: d[category],
                      }));
                    return renderLine({
                      key: ["line", series.name, category].filter(Boolean).join("-"),
                      name: [series.name, category].filter(Boolean).join("-"),
                      seriesIndex,
                      category,
                      color: categoryColors.get(category),
                      activeDot,
                      activeLegend,
                      onValueChange,
                      onDotClick,
                      curveType,
                      connectNulls,
                      yAxisId: yAxisId === -1 ? idx : yAxisId,
                      xAxisId: xAxisId === -1 ? seriesIndex : xAxisId,
                      data: dataRange,
                      showAnimation,
                      animationDuration,
                      xAxisCount: xAxisConfigs.length,
                    });
                  })}
                </>
              );
            })}
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
