"use client";
import React, { Fragment, useState } from "react";
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
  Label,
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

import {
  BaseColors,
  colorPalette,
  defaultValueFormatter,
  getColorClassNames,
  themeColorRange,
  tremorTwMerge,
} from "lib";
import { CurveType, HorizontalPosition } from "../../../lib/inputTypes";

export interface LineChartProps extends BaseChartProps {
  curveType?: CurveType;
  connectNulls?: boolean;
  orientations?: HorizontalPosition[];
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
    showXAxisLine = false,
    showYAxisLine = false,
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
    padding = !showXAxis && !showYAxis ? { left: 0, right: 0 } : { left: 20, right: 20 },
    tickGap = 5,
    dataLabelOptions,
    orientations,
    xAxisLabel,
    yAxisLabel,
    ...other
  } = props;
  const CustomTooltip = customTooltip;
  const [legendHeight, setLegendHeight] = useState(60);
  const [activeDot, setActiveDot] = useState<ActiveDot | undefined>(undefined);
  const [activeLegend, setActiveLegend] = useState<string | undefined>(undefined);
  const categoryColors = constructCategoryColors(categories, colors);

  const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);
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

  return (
    <div ref={ref} className={tremorTwMerge("w-full h-80", className)} {...other}>
      <ResponsiveContainer className="h-full w-full">
        {data?.length ? (
          <ReChartsLineChart
            data={data}
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
            <XAxis
              padding={padding}
              hide={!showXAxis}
              dataKey={index}
              interval={startEndOnly ? "preserveStartEnd" : intervalType}
              tick={{ transform: "translate(0, 6)" }}
              ticks={startEndOnly ? [data[0][index], data[data.length - 1][index]] : undefined}
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
              axisLine={showXAxis && showXAxisLine}
              minTickGap={tickGap}
              angle={rotateLabelX?.angle}
              dy={rotateLabelX?.verticalShift}
              height={rotateLabelX?.xAxisHeight}
            />
            {orientations ? (
              categories.map((_, idx) => (
                <YAxis
                  width={yAxisWidth}
                  hide={!showYAxis}
                  axisLine={showYAxis && showYAxisLine}
                  tickLine={false}
                  type="number"
                  domain={yAxisDomain as AxisDomain}
                  tick={{
                    transform: `translate(${orientations[idx] === "right" ? 3 : -3}, 0)`,
                  }}
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
                  tickFormatter={(value) => valueFormatter(value, idx)}
                  allowDecimals={allowDecimals}
                  orientation={orientations[idx]}
                  yAxisId={idx}
                  key={idx}
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
              ))
            ) : (
              <YAxis
                width={yAxisWidth}
                hide={!showYAxis}
                axisLine={showYAxis && showYAxisLine}
                tickLine={false}
                type="number"
                domain={yAxisDomain as AxisDomain}
                tick={{ transform: "translate(-3, 0)" }}
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
                tickFormatter={valueFormatter}
                allowDecimals={allowDecimals}
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
            )}

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
                        valueFormatter={valueFormatter}
                        categoryColors={categoryColors}
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
            {categories.map((category, idx) => (
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
                      className={tremorTwMerge(
                        "stroke-tremor-background dark:stroke-dark-tremor-background",
                        onValueChange ? "cursor-pointer" : "",
                        getColorClassNames(
                          categoryColors.get(dataKey) ?? BaseColors.Gray,
                          colorPalette.text,
                        ).fillColor,
                      )}
                      cx={cx}
                      cy={cy}
                      r={5}
                      fill=""
                      stroke={stroke}
                      strokeLinecap={strokeLinecap}
                      strokeLinejoin={strokeLinejoin}
                      strokeWidth={strokeWidth}
                      onClick={(dotProps: any, event) => onDotClick(props, event)}
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

                  if (
                    (hasOnlyOneValueForThisKey(data, category) &&
                      !(activeDot || (activeLegend && activeLegend !== category))) ||
                    (activeDot?.index === index && activeDot?.dataKey === category)
                  ) {
                    return (
                      <Dot
                        key={index}
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
                  return <Fragment key={index}></Fragment>;
                }}
                key={category}
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
                yAxisId={orientations ? idx : undefined}
              />
            ))}
            {onValueChange
              ? categories.map((category, idx) => (
                  <Line
                    className={tremorTwMerge("cursor-pointer")}
                    strokeOpacity={0}
                    key={category}
                    name={category}
                    type={curveType}
                    dataKey={category}
                    stroke="transparent"
                    fill="transparent"
                    legendType="none"
                    tooltipType="none"
                    strokeWidth={12}
                    connectNulls={connectNulls}
                    onClick={(props: any, event) => {
                      event.stopPropagation();
                      const { name } = props;
                      onCategoryClick(name);
                    }}
                    yAxisId={orientations ? idx : undefined}
                  />
                ))
              : null}
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
