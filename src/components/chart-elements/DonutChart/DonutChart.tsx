"use client";
import React from "react";
import { tremorTwMerge } from "lib";
import { Pie, PieChart as ReChartsDonutChart, ResponsiveContainer, Tooltip } from "recharts";

import NoData from "../common/NoData";
import { Color, ValueFormatter } from "../../../lib/inputTypes";
import { defaultValueFormatter, themeColorRange } from "lib";

import { parseData, parseLabelInput } from "./inputParser";
import { DonutChartTooltip } from "./DonutChartTooltip";

import type BaseAnimationTimingProps from "../common/BaseAnimationTimingProps";

type DonutChartVariant = "donut" | "pie";

export interface DonutChartProps extends BaseAnimationTimingProps {
  data: any[];
  category?: string;
  index?: string;
  colors?: Color[];
  variant?: DonutChartVariant;
  valueFormatter?: ValueFormatter;
  label?: string;
  showLabel?: boolean;
  showAnimation?: boolean;
  showTooltip?: boolean;
  noDataText?: string;
}

const DonutChart = React.forwardRef<HTMLDivElement, DonutChartProps>((props, ref) => {
  const {
    data = [],
    category = "value",
    index = "name",
    colors = themeColorRange,
    variant = "donut",
    valueFormatter = defaultValueFormatter,
    label,
    showLabel = true,
    animationDuration = 900,
    showAnimation = true,
    showTooltip = true,
    noDataText,
    className,
    ...other
  } = props;
  const isDonut = variant == "donut";

  const parsedLabelInput = parseLabelInput(label, valueFormatter, data, category);

  return (
    <div ref={ref} className={tremorTwMerge("w-full h-44", className)} {...other}>
      <ResponsiveContainer className="h-full w-full">
        {data?.length ? (
          <ReChartsDonutChart>
            {showLabel && isDonut ? (
              <text
                className={tremorTwMerge(
                  // light
                  "fill-tremor-content-emphasis",
                  // dark
                  "dark:fill-dark-tremor-content-emphasis",
                )}
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {parsedLabelInput}
              </text>
            ) : null}
            <Pie
              className="stroke-tremor-background dark:stroke-dark-tremor-background"
              data={parseData(data, colors)}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius={isDonut ? "75%" : "0%"}
              outerRadius="100%"
              stroke=""
              strokeLinejoin="round"
              dataKey={category}
              nameKey={index}
              isAnimationActive={showAnimation}
              animationDuration={animationDuration}
            />
            {showTooltip ? (
              <Tooltip
                wrapperStyle={{ outline: "none" }}
                content={({ active, payload }) => (
                  <DonutChartTooltip
                    active={active}
                    payload={payload}
                    valueFormatter={valueFormatter}
                  />
                )}
              />
            ) : null}
          </ReChartsDonutChart>
        ) : (
          <NoData noDataText={noDataText} />
        )}
      </ResponsiveContainer>
    </div>
  );
});

DonutChart.displayName = "DonutChart";

export default DonutChart;
