import React from "react";

import {
  Pie,
  PieChart as ReChartsDonutChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Color,
  Height,
  MarginTop,
  ValueFormatter,
} from "../../../lib/inputTypes";
import {
  classNames,
  defaultColors,
  defaultValueFormatter,
  getHexFromColorThemeValue,
  parseHeight,
  parseMarginTop,
  themeColorRange,
} from "lib";

import { parseData, parseLabelInput } from "./inputParser";
import { DonutChartTooltip } from "./DonutChartTooltip";

type DonutChartVariant = "donut" | "pie";

export interface DonutChartProps {
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
  height?: Height;
  marginTop?: MarginTop;
}

const DonutChart = ({
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
  height = "h-44",
  marginTop = "mt-0",
}: DonutChartProps) => {
  const isDonut = variant == "donut";

  const parsedLabelInput = parseLabelInput(
    label,
    valueFormatter,
    data,
    category
  );

  return (
    <div
      className={classNames(
        "tremor-base tr-w-full",
        parseHeight(height),
        parseMarginTop(marginTop)
      )}
    >
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
          ></Pie>
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
};

export default DonutChart;
