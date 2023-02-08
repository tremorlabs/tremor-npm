import React from "react";
import { twMerge } from "tailwind-merge";
import { Pie, PieChart as ReChartsDonutChart, ResponsiveContainer, Tooltip } from "recharts";

import { Color, ValueFormatter } from "../../../lib/inputTypes";
import {
  defaultColors,
  defaultValueFormatter,
  getHexFromColorThemeValue,
  themeColorRange,
} from "lib";

import { parseData, parseLabelInput } from "./inputParser";
import { DonutChartTooltip } from "./DonutChartTooltip";

type DonutChartVariant = "donut" | "pie";

export interface DonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[];
  category?: string;
  dataKey?: string;
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
    dataKey = "name",
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
    <div ref={ref} className={twMerge("w-full h-44", className)} {...other}>
      <ResponsiveContainer width="100%" height="100%">
        <ReChartsDonutChart>
          {showLabel && isDonut ? (
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill={getHexFromColorThemeValue(defaultColors.text)}
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
            paddingAngle={0}
            dataKey={category}
            nameKey={dataKey}
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
      </ResponsiveContainer>
    </div>
  );
});

export default DonutChart;
