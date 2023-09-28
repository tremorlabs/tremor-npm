"use client";
import React, { useState } from "react";
import {
  Area,
  CartesianGrid,
  Dot,
  Legend,
  Line,
  AreaChart as ReChartsAreaChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AxisDomain } from "recharts/types/util/types";

import {
  constructCategoryColors,
  getYAxisDomain,
  hasOnlyOneValueForThisKey,
} from "../common/utils";
import BaseChartProps from "../common/BaseChartProps";
import ChartLegend from "../common/ChartLegend";
import ChartTooltip from "../common/ChartTooltip";
import NoData from "../common/NoData";

import {
  BaseColors,
  defaultValueFormatter,
  themeColorRange,
  colorPalette,
  getColorClassNames,
  tremorTwMerge,
} from "lib";
import { CurveType } from "../../../lib/inputTypes";
import DeltaCalculationProps from "components/chart-elements/common/DeltaCalculationProps";
import DeltaCalculationReferenceShape from "components/chart-elements/common/DeltaCalculationReferenceShape";

export interface AreaChartProps extends BaseChartProps {
  stack?: boolean;
  curveType?: CurveType;
  connectNulls?: boolean;
}

interface ActiveDot {
  index?: number;
  dataKey?: string;
}

const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>((props, ref) => {
  const {
    data = [],
    categories = [],
    index,
    stack = false,
    colors = themeColorRange,
    valueFormatter = defaultValueFormatter,
    startEndOnly = false,
    showXAxis = true,
    showYAxis = true,
    yAxisWidth = 56,
    showAnimation = false,
    animationDuration = 900,
    showTooltip = true,
    showLegend = true,
    showGridLines = true,
    showGradient = true,
    autoMinValue = false,
    curveType = "linear",
    minValue,
    maxValue,
    connectNulls = false,
    allowDecimals = true,
    enableDeltaCalculation = false,
    noDataText,
    className,
    onValueChange,
    ...other
  } = props;
  const [deltaCalculation, setDeltaCalculation] = useState<DeltaCalculationProps>({});
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
      <ResponsiveContainer className="h-full w-full select-none">
        {data?.length ? (
          <ReChartsAreaChart
            data={data}
            onMouseDown={(e) => enableDeltaCalculation && setDeltaCalculation({ leftArea: e })}
            onMouseMove={(e) =>
              enableDeltaCalculation &&
              deltaCalculation.leftArea &&
              setDeltaCalculation((prev) => ({ ...prev, rightArea: e }))
            }
            onMouseUp={() => setDeltaCalculation({})}
            onClick={
              hasOnValueChange && (activeLegend || activeDot)
                ? () => {
                    setActiveDot(undefined);
                    setActiveLegend(undefined);
                    onValueChange?.(null);
                  }
                : undefined
            }
          >
            {" "}
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
              hide={!showXAxis}
              dataKey={index}
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
              interval="preserveStartEnd"
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
            <Tooltip
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
              content={
                showTooltip ? (
                  ({ active, payload, label }) => (
                    <ChartTooltip
                      active={active}
                      payload={payload}
                      label={label}
                      valueFormatter={valueFormatter}
                      categoryColors={categoryColors}
                      deltaCalculation={deltaCalculation}
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
                  )
                }
              />
            ) : null}
            {categories.map((category) => {
              return (
                <defs key={category}>
                  {showGradient ? (
                    <linearGradient
                      className={
                        getColorClassNames(
                          categoryColors.get(category) ?? BaseColors.Gray,
                          colorPalette.text,
                        ).textColor
                      }
                      id={categoryColors.get(category)}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="currentColor"
                        stopOpacity={
                          activeDot || (activeLegend && activeLegend !== category) ? 0.15 : 0.4
                        }
                      />
                      <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                    </linearGradient>
                  ) : (
                    <linearGradient
                      className={
                        getColorClassNames(
                          categoryColors.get(category) ?? BaseColors.Gray,
                          colorPalette.text,
                        ).textColor
                      }
                      id={categoryColors.get(category)}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        stopColor="currentColor"
                        stopOpacity={
                          activeDot || (activeLegend && activeLegend !== category) ? 0.1 : 0.3
                        }
                      />
                    </linearGradient>
                  )}
                </defs>
              );
            })}
            {categories.map((category) => (
              <Area
                className={
                  getColorClassNames(
                    categoryColors.get(category) ?? BaseColors.Gray,
                    colorPalette.text,
                  ).strokeColor
                }
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
                    payload,
                    stroke,
                    strokeLinecap,
                    strokeLinejoin,
                    strokeWidth,
                    cx,
                    cy,
                    dataKey,
                    index: idx,
                  } = props;
                  
                  if (
                    (hasOnlyOneValueForThisKey(data, category) &&
                      !(activeDot || (activeLegend && activeLegend !== category))) ||
                    (activeDot?.index === idx && activeDot?.dataKey === category) ||
                    (payload[index] === deltaCalculation?.leftArea?.activeLabel)
                  ) {
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
                fill={`url(#${categoryColors.get(category)})`}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                isAnimationActive={showAnimation}
                animationDuration={animationDuration}
                stackId={stack ? "a" : undefined}
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
            {onValueChange
              ? categories.map((category) => (
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
                  />
                ))
              : null}
          </ReChartsAreaChart>
        ) : (
          <NoData noDataText={noDataText} />
        )}
      </ResponsiveContainer>
    </div>
  );
});

AreaChart.displayName = "AreaChart";

export default AreaChart;
