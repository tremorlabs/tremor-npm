import React from "react";
import { twMerge } from "tailwind-merge";
import { Pie, PieChart as ReChartsDonutChart, ResponsiveContainer, Tooltip } from "recharts";

import NoData from "../common/NoData";
import { defaultValueFormatter, hexColors, themeColorRange } from "lib";
import { Color, ValueFormatter } from "../../../lib/inputTypes";
import { DEFAULT_COLOR } from "lib/theme";

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
  noDataText?: string;
  startAngle?: number;
  percentage?: number; // New prop for the desired angle percentage
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
    noDataText,
    startAngle = 90,
    percentage = 100,
    ...other
  } = props;
  const isDonut = variant == "donut";

  const parsedLabelInput = parseLabelInput(label, valueFormatter, data, category);

  const calculatedEndAngle = startAngle - 360 * (percentage / 100);

  return (
    <div ref={ref} className={twMerge("w-full h-44", className)} {...other}>
      <ResponsiveContainer width="100%" height="100%">
        {data?.length ? (
          <ReChartsDonutChart>
            {showLabel && isDonut ? (
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill={hexColors[DEFAULT_COLOR]}
              >
                {parsedLabelInput}
              </text>
            ) : null}
            <Pie
              data={parseData(data, colors)}
              cx="50%"
              cy="50%"
              startAngle={startAngle}
              endAngle={calculatedEndAngle}
              innerRadius={isDonut ? "75%" : "0%"}
              outerRadius="100%"
              paddingAngle={0}
              dataKey={category}
              nameKey={index}
              isAnimationActive={showAnimation}
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
