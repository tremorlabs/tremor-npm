"use client";
import React from "react";
import { tremorTwMerge } from "lib";
import { Pie, PieChart as ReChartsDonutChart, ResponsiveContainer, Tooltip } from "recharts";

import { Color, ValueFormatter } from "../../../lib/inputTypes";
import { defaultValueFormatter, themeColorRange } from "lib";

import { parseData, parseLabelInput } from "./inputParser";
import { DonutChartTooltip } from "./DonutChartTooltip";

type DonutChartVariant = "donut" | "pie";

export interface DonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
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
    showAnimation = true,
    showTooltip = true,
    className,
    ...other
  } = props;
  const isDonut = variant == "donut";

  const parsedLabelInput = parseLabelInput(label, valueFormatter, data, category);

  return (
    <div ref={ref} className={tremorTwMerge("w-full h-44", className)} {...other}>
      <ResponsiveContainer className="h-full w-full">
        <ReChartsDonutChart>
          {showLabel && isDonut ? (
            <text
              className="fill-tremor-content-emphasis"
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {parsedLabelInput}
            </text>
          ) : null}
          <Pie
            data={parseData(data, colors)}
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius={isDonut ? "75%" : "0%"}
            outerRadius="100%"
            paddingAngle={1}
            cornerRadius={3}
            dataKey={category}
            nameKey={index}
            isAnimationActive={showAnimation}
            animationDuration={1100}
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
      </ResponsiveContainer>
    </div>
  );
});

export default DonutChart;
