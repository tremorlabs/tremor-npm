"use client";
import React, { useState } from "react";
import {
  Area,
  CartesianGrid,
  Legend,
  Radar, 
  RadarChart  as ReChartsRadarChart,
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  Tooltip,
} from "recharts";


import { constructCategoryColors } from "../common/utils";
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

export interface RadarChartProps extends BaseAnimationTimingProps {
    data: any[];
    category?: string;
    index?: string;
    colors?: Color[];
    valueFormatter?: ValueFormatter;
    outerRadius?: string | number;
    dashArray?: boolean;
    showAnimation?: boolean;
    showTooltip?: boolean;
    noDataText?: string;
    showTooltip?: boolean;
    showLegend?: boolean;
    showGridLines?: boolean;
    showGradient?: boolean;
    noDataText?: string;
    className?: string;
  }

const RadarChart = React.forwardRef<HTMLDivElement, RadarChartProps>((props, ref) => {
  const {
    data = [],
    categories = [],
    index,
    colors = themeColorRange,
    valueFormatter = defaultValueFormatter,
    dashArray = false,
    outerRadius = "80%",
    showAnimation = true,
    animationDuration = 900,
    showTooltip = true,
    showLegend = true,
    showGridLines = true,
    showGradient = false,
    noDataText,
    className,
    ...other
  } = props;
  const [legendHeight, setLegendHeight] = useState(60);
  const categoryColors = constructCategoryColors(categories, colors);  

  return (
    <div ref={ref} className={tremorTwMerge("w-full h-80", className)} {...other}>
      <ResponsiveContainer className="h-full w-full">
        {data?.length ? (
          <ReChartsRadarChart data={data} outerRadius={outerRadius}>
            {showGridLines ? (
              <PolarGrid
                className={tremorTwMerge(
                  // common
                  "stroke-1",
                  // light
                  "stroke-tremor-content-subtle",
                  // dark
                  "dark:stroke-dark-tremor-content-subtle",
                )}
                strokeDasharray={dashArray ? "3 3" : ""}
                horizontal={true}
                vertical={false}
              />
            ) : null}
            {showTooltip ? (
              <Tooltip
                wrapperStyle={{ outline: "none" }}
                isAnimationActive={false}
                cursor={{ stroke: "#d1d5db", strokeWidth: 1 }} // @achi @severin
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
            {
                categories.length > 0 ? (
                    categories.map((category) => {
                        return(
                            <>
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
                                        <stop offset="5%" stopColor="currentColor" stopOpacity={0.4} />
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
                                        <stop stopColor="currentColor" stopOpacity={0.3} />
                                        </linearGradient>
                                    )}
                                </defs>
                                <Radar
                                    className={
                                    getColorClassNames(
                                        categoryColors.get(category) ?? BaseColors.Gray,
                                        colorPalette.text,
                                    ).strokeColor
                                    }
                                    dot={false}
                                    key={category}
                                    name={category}
                                    dataKey={category}
                                    stroke=""
                                    fill={`url(#${categoryColors.get(category)})`}
                                    isAnimationActive={showAnimation}
                                    animationDuration={animationDuration}
                                />
                                <PolarAngleAxis dataKey={index} />
                            </>
                        )
                    })
                ) : (
                    <Radar/>
                )
            }
          </ReChartsRadarChart>
        ) : (
          <NoData noDataText={noDataText} />
        )}
      </ResponsiveContainer>
    </div>
  );
});

RadarChart.displayName = "RadarChart";

export default RadarChart;
