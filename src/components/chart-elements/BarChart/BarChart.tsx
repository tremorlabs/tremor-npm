"use client";
import { tremorTwMerge } from "lib";
import React, { useState } from "react";

import {
  BarChart as ReChartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import BaseChartProps from "../common/BaseChartProps";
import ChartLegend from "../common/ChartLegend";
import ChartTooltip from "../common/ChartTooltip";
import NoData from "../common/NoData";
import { constructCategoryColors, deepEqual, getYAxisDomain } from "../common/utils";

import { BaseColors, defaultValueFormatter, themeColorRange } from "lib";
import { AxisDomain } from "recharts/types/util/types";
import { renderHorizontalXAxis, renderVerticalXAxis } from "../common/XAxis";
import { renderHorizontalYAxis, renderVerticalYAxis } from "../common/YAxis";
import { renderBar } from "../common/Bar";

export interface BarChartProps extends BaseChartProps {
  layout?: "vertical" | "horizontal";
  stack?: boolean;
  relative?: boolean;
  barCategoryGap?: string | number;
}

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>((props, ref) => {
  const {
    data = [],
    categories = [],
    index,
    colors = themeColorRange,
    valueFormatter = defaultValueFormatter,
    layout = "horizontal",
    stack = false,
    relative = false,
    startEndOnly = false,
    animationDuration = 900,
    showAnimation = false,
    showXAxis = true,
    showYAxis = true,
    yAxisWidth = 56,
    intervalType = "equidistantPreserveStart",
    showTooltip = true,
    showLegend = true,
    showGridLines = true,
    autoMinValue = false,
    minValue,
    maxValue,
    allowDecimals = true,
    noDataText,
    onValueChange,
    enableLegendSlider = false,
    customTooltip,
    rotateLabelX,
    barCategoryGap,
    tickGap = 5,
    xAxisLabel,
    yAxisLabel,
    className,
    xAxisConfigs = [{ orientation: "bottom" }],
    yAxisConfigs = [{ orientation: "left" }],
    ...other
  } = props;
  const CustomTooltip = customTooltip;
  const paddingValue = !showXAxis && !showYAxis ? 0 : 20;
  const [legendHeight, setLegendHeight] = useState(60);
  const categoryColors = constructCategoryColors(categories, colors);
  const [activeBar, setActiveBar] = React.useState<any | undefined>(undefined);
  const [activeLegend, setActiveLegend] = useState<string | undefined>(undefined);
  const hasOnValueChange = !!onValueChange;

  const isSeriesData: boolean = data?.[0]?.data && data[0].data !== undefined;
  const seriesData = isSeriesData ? data : [{ data }];

  function onBarClick(data: any, idx: number, event: React.MouseEvent) {
    event.stopPropagation();
    if (!onValueChange) return;
    if (deepEqual(activeBar, { ...data.payload, value: data.value })) {
      setActiveLegend(undefined);
      setActiveBar(undefined);
      onValueChange?.(null);
    } else {
      setActiveLegend(data.tooltipPayload?.[0]?.dataKey);
      setActiveBar({
        ...data.payload,
        value: data.value,
      });
      onValueChange?.({
        eventType: "bar",
        categoryClicked: data.tooltipPayload?.[0]?.dataKey,
        ...data.payload,
      });
    }
  }

  function onCategoryClick(dataKey: string) {
    if (!hasOnValueChange) return;
    if (dataKey === activeLegend && !activeBar) {
      setActiveLegend(undefined);
      onValueChange?.(null);
    } else {
      setActiveLegend(dataKey);
      onValueChange?.({
        eventType: "category",
        categoryClicked: dataKey,
      });
    }
    setActiveBar(undefined);
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
          <ReChartsBarChart
            barCategoryGap={barCategoryGap}
            // This is necessary because recharts uses the length of the chart data (if provided) to slice the child (X-axis, Y-axis) data
            data={isSeriesData ? undefined : data}
            stackOffset={stack ? "sign" : relative ? "expand" : "none"}
            layout={layout === "vertical" ? "vertical" : "horizontal"}
            onClick={
              hasOnValueChange && (activeLegend || activeBar)
                ? () => {
                    setActiveBar(undefined);
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
                horizontal={layout !== "vertical"}
                vertical={layout === "vertical"}
              />
            ) : null}

            {xAxisConfigs.map((xAxisConfig, idx) => {
              const d = seriesData
                .filter((d) => xAxisConfig.series?.includes(d.name))
                .flatMap((d) => d.data);
              const commonProps = {
                key: `x-axis-${idx}`,
                showAxis: showXAxis,
                data: d.length === 0 ? seriesData[idx].data : d,
                rotateLabel: rotateLabelX,
                label: xAxisLabel,
                orientation: xAxisConfig.orientation,
                xAxisId: idx,
                layout,
                padding: { left: paddingValue, right: paddingValue },
                xAxisCount: xAxisConfigs.length,
              };
              return layout && layout === "vertical"
                ? renderVerticalXAxis({
                    ...commonProps,
                    relative,
                    valueFormatter,
                    width: yAxisWidth,
                  })
                : renderHorizontalXAxis({
                    ...commonProps,
                    intervalType,
                    startEndOnly,
                    minTickGap: tickGap,
                    dataKey: index,
                  });
            })}
            {yAxisConfigs.map((yAxisConfig, idx) => {
              const domain: AxisDomain = getYAxisDomain(
                yAxisConfig.autoMinValue ?? autoMinValue,
                yAxisConfig.minValue ?? minValue,
                yAxisConfig.maxValue ?? maxValue,
              );
              const commonProps = {
                key: `y-axis-${idx}`,
                showAxis: showYAxis,
                allowDecimals,
                orientation: yAxisConfig.orientation,
                yAxisId: idx,
                label: yAxisLabel,
                layout,
                xAxisCount: xAxisConfigs.length,
              };
              return layout && layout === "vertical"
                ? renderVerticalYAxis({
                    ...commonProps,
                    intervalType,
                    startEndOnly,
                    data,
                    minTickGap: tickGap,
                    dataKey: index,
                  })
                : renderHorizontalYAxis({
                    ...commonProps,
                    width: yAxisWidth,
                    domain,
                    valueFormatter: yAxisConfig.valueFormatter ?? valueFormatter,
                    relative,
                  });
            })}
            <Tooltip
              wrapperStyle={{ outline: "none" }}
              isAnimationActive={false}
              cursor={{ fill: "#d1d5db", opacity: "0.15" }}
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
                    return renderBar({
                      key: ["bar", series.name, category].filter(Boolean).join("-"),
                      name: [series.name, category].filter(Boolean).join("-"),
                      seriesIndex,
                      category,
                      color: categoryColors.get(category),
                      activeBar,
                      activeLegend,
                      onValueChange,
                      onBarClick,
                      stackId: stack || relative ? "a" : undefined,
                      yAxisId: yAxisId === -1 ? idx : yAxisId,
                      xAxisId: xAxisId === -1 ? seriesIndex : xAxisId,
                      data: dataRange,
                      showAnimation,
                      animationDuration,
                      xAxisCount: xAxisConfigs.length,
                      layout,
                    });
                  })}
                </>
              );
            })}
          </ReChartsBarChart>
        ) : (
          <NoData noDataText={noDataText} />
        )}
      </ResponsiveContainer>
    </div>
  );
});

BarChart.displayName = "BarChart";

export default BarChart;
