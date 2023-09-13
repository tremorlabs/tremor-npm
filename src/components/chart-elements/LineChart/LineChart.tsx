"use client";
import React, { useState } from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart as ReChartsLineChart,
    ReferenceArea,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { AxisDomain } from "recharts/types/util/types";

import { constructCategoryColors, getYAxisDomain } from "../common/utils";
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
import { CurveType } from "../../../lib/inputTypes";

export interface LineChartProps extends BaseChartProps {
    curveType?: CurveType;
    connectNulls?: boolean;
}

export type SelectionProps = {
    leftArea?: any;
    rightArea?: any;
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
        ...other
    } = props;
    const [selection, setSelection] = useState<SelectionProps>({})

    const [legendHeight, setLegendHeight] = useState(60);
    const categoryColors = constructCategoryColors(categories, colors);


    const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);

    return (
        <div ref={ref} className={tremorTwMerge("w-full h-80", className)} {...other}>
            <ResponsiveContainer className="h-full w-full select-none">
                {data?.length ? (
                    <ReChartsLineChart
                        data={data}
                        onMouseDown={(e) => setSelection({ leftArea: e })}
                        onMouseMove={(e) => selection.leftArea && setSelection(prev => ({ ...prev, rightArea: e }))}
                        onMouseUp={() => setSelection({})}

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
                        {(showTooltip) ? (
                            <Tooltip
                                // ongoing issue: https://github.com/recharts/recharts/issues/2920
                                wrapperStyle={{ outline: "none" }}
                                isAnimationActive={false}
                                cursor={{ stroke: "#d1d5db", strokeWidth: selection.leftArea?.activeLabel && selection.rightArea?.activeLabel ? 0 : 1 }}
                                content={({ active, payload, label }) => (
                                    <ChartTooltip
                                        active={active}
                                        payload={payload}
                                        label={label}
                                        valueFormatter={valueFormatter}
                                        categoryColors={categoryColors}
                                        selection={selection}
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
                                dot={(props) => {
                                    if (props.payload[index] === selection?.leftArea?.activeLabel) {
                                        return (
                                            <svg width={props.width} height={props.height}>
                                                <circle 
                                                    cx={props.cx} 
                                                    cy={props.cy} 
                                                    r={4} 
                                                    stroke={props.stroke}
                                                    strokeLinecap={props.strokeLinecap}
                                                    strokeLinejoin={props.strokeLinejoin}
                                                    strokeWidth={props.strokeWidth}
                                                    className={
                                                        tremorTwMerge(
                                                            "stroke-tremor-background dark:stroke-dark-tremor-background",
                                                            getColorClassNames(
                                                                categoryColors.get(category) ?? BaseColors.Gray,
                                                                colorPalette.text,
                                                            ).fillColor,
                                                        )
                                                    } 
                                                />
                                            </svg>
                                        )
                                    }

                                    return <></>
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
                            />
                        ))}
                        {selection.leftArea?.activeLabel && selection.rightArea?.activeLabel ? (
                            <ReferenceArea
                                x1={selection.leftArea.activeLabel}
                                x2={selection.rightArea.activeLabel}
                                fillOpacity={0.2}
                                // strokeOpacity={0}
                                strokeDasharray={"3 3"}
                                stroke="gray"
                                // ifOverflow="hidden"
                                // xAxis={}
                                shape={props => {
                                    return (
                                        <>
                                            <rect
                                                x={props.x}
                                                y={props.y}
                                                width={props.width}
                                                height={props.height}
                                                fill=""
                                                stroke=""
                                                strokeWidth={0}
                                                strokeOpacity={0}
                                                className={tremorTwMerge(
                                                    // common
                                                    "text-tremor-label",
                                                    // light
                                                    "fill-tremor-content-subtle",
                                                    // dark
                                                    "dark:fill-dark-tremor-content-subtle",
                                                )}
                                                fillOpacity={0.2}
                                            />
                                            <line
                                                x1={props.x}
                                                x2={props.x}
                                                y1={props.y}
                                                y2={props.y + props.height}
                                                strokeDasharray={"3 3"}
                                                className={tremorTwMerge(
                                                    // common
                                                    "stroke-1",
                                                    // light
                                                    "stroke-tremor-content-subtle",
                                                    // dark
                                                    "dark:stroke-dark-tremor-content-subtle",
                                                )}
                                            />
                                            <line
                                                x1={props.x + props.width}
                                                x2={props.x + props.width}
                                                y1={props.y}
                                                y2={props.y + props.height}
                                                strokeDasharray={"3 3"}
                                                className={tremorTwMerge(
                                                    // common
                                                    "stroke-1",
                                                    // light
                                                    "stroke-tremor-content-subtle",
                                                    // dark
                                                    "dark:stroke-dark-tremor-content-subtle",
                                                )}
                                            />
                                        </>
                                    );
                                }}
                            />
                        ) : null}
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
