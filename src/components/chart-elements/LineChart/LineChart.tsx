"use client";
import React, { Fragment, useState } from "react";
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

import { constructCategoryColors, getForecastStrokeDasharray, getPercentageWithCategories, getYAxisDomain } from "../common/utils";
import NoData from "../common/NoData";
import BaseChartProps from "../common/BaseChartProps";
import ChartLegend from "components/chart-elements/common/ChartLegend";
import ChartTooltip from "../common/ChartTooltip";

import {
    BaseColors,
    colorPalette,
    defaultValueFormatter,
    getColorClassNames,
    themeColorRange,
    tremorTwMerge,
} from "lib";
import { CurveType, LineStyle } from "../../../lib/inputTypes";

export interface LineChartProps extends BaseChartProps {
    curveType?: CurveType;
    connectNulls?: boolean;
    forecastCategories?: string[] | string[][];
    forecastLineStyle?: LineStyle;
}

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>((props, ref) => {
    const {
        data = [],
        categories = [],
        forecastCategories,
        forecastLineStyle = "dashed",
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
        ...other
    } = props;
    const [legendHeight, setLegendHeight] = useState(60);
    const categoryColors = constructCategoryColors(categories, colors);

    const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);
  
    const percentageOfRealDatas = forecastCategories ? getPercentageWithCategories(data, categories) : 1;
    const percentageOfForecastedDatas = forecastCategories ? getPercentageWithCategories(data, forecastCategories) : 0;

    const animationDurationPercentage = animationDuration * percentageOfRealDatas
    const forecastAnimationDurationPercentage = animationDuration * percentageOfForecastedDatas
    const forecastAnimationDelay = animationDurationPercentage - (animationDurationPercentage / 2.5)

    const forecastStrokeDasharray = getForecastStrokeDasharray(forecastLineStyle);
      
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
                                        categories={categories}
                                        forecastCategories={forecastCategories}
                                    />
                                )}
                                position={{ y: 0 }}
                            />
                        ) : null}
                        {showLegend ? (
                            <Legend
                                verticalAlign="top"
                                height={legendHeight}
                                content={({ payload }) => ChartLegend({ payload }, categoryColors, setLegendHeight, forecastCategories)}
                            />
                        ) : null}
                        {categories.map((category) => (
                            <Line
                                className={
                                    getColorClassNames(
                                        categoryColors.get(category) ?? BaseColors.Gray,
                                        colorPalette.text,
                                    ).strokeColor
                                }
                                activeDot={{
                                    className: tremorTwMerge(
                                        "stroke-tremor-background dark:stroke-dark-tremor-background",
                                        getColorClassNames(
                                            categoryColors.get(category) ?? BaseColors.Gray,
                                            colorPalette.text,
                                        ).fillColor,
                                    ),
                                }}
                                dot={false}
                                key={category}
                                name={category}
                                type={curveType}
                                dataKey={category}
                                stroke=""
                                strokeWidth={2}
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                isAnimationActive={showAnimation}
                                animationDuration={animationDurationPercentage}
                                connectNulls={connectNulls}
                            />
                        ))}
                        {forecastCategories ? (
                            forecastCategories.map((category, idx) => (
                                <Fragment key={idx}>
                                    {Array.isArray(category) ? (
                                        <>
                                            {category.map((subCategory) => (
                                                <Line
                                                    className={
                                                        tremorTwMerge(
                                                            "opacity-50",
                                                            getColorClassNames(
                                                                categoryColors.get(categories[idx]) ?? BaseColors.Gray,
                                                                colorPalette.text,
                                                            ).strokeColor
                                                        )
                                                    }
                                                    
                                                    activeDot={{
                                                        className: tremorTwMerge(
                                                            "stroke-tremor-background dark:stroke-dark-tremor-background",
                                                            getColorClassNames(
                                                                categoryColors.get(categories[idx]) ?? BaseColors.Gray,
                                                                colorPalette.text,
                                                            ).fillColor,
                                                        ),
                                                    }}
                                                    dot={false}
                                                    key={subCategory}
                                                    name={subCategory}
                                                    type={curveType}
                                                    dataKey={subCategory}
                                                    stroke=""
                                                    strokeWidth={2}
                                                    strokeLinejoin="round"
                                                    strokeLinecap="round"
                                                    strokeDasharray={forecastStrokeDasharray}
                                                    isAnimationActive={showAnimation}
                                                    animationDuration={forecastAnimationDurationPercentage}
                                                    animationBegin={forecastAnimationDelay}
                                                    connectNulls={connectNulls}
                                                />
                                            ))}
                                        </>
                                    ) : (
                                        <Line
                                            className={
                                                tremorTwMerge(
                                                    "opacity-50",
                                                    getColorClassNames(
                                                        categoryColors.get(categories[idx]) ?? BaseColors.Gray,
                                                        colorPalette.text,
                                                    ).strokeColor
                                                )
                                            }
                                            
                                            activeDot={{
                                                className: tremorTwMerge(
                                                    "stroke-tremor-background dark:stroke-dark-tremor-background",
                                                    getColorClassNames(
                                                        categoryColors.get(categories[idx]) ?? BaseColors.Gray,
                                                        colorPalette.text,
                                                    ).fillColor,
                                                ),
                                            }}
                                            dot={false}
                                            key={category}
                                            name={category}
                                            type={curveType}
                                            dataKey={category}
                                            stroke=""
                                            strokeWidth={2}
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeDasharray={forecastStrokeDasharray}
                                            isAnimationActive={showAnimation}
                                            animationDuration={forecastAnimationDurationPercentage}
                                            animationBegin={forecastAnimationDelay}
                                            connectNulls={connectNulls}
                                        />
                                    )}
                                </Fragment>
                            ))
                        ) : (
                            null
                        )}
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
