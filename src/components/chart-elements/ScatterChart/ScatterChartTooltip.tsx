import React from "react";

import { ScatterChartValueFormatter } from "components/chart-elements/ScatterChart/ScatterChart";
import { bgColors } from "components/spark-elements/common/style";
import { Color, defaultValueFormatter, tremorTwMerge } from "lib";

export const ChartTooltipFrame = ({ children }: { children: React.ReactNode }) => (
  <div
    className={tremorTwMerge(
      "rounded-tremor-default text-tremor-default bg-tremor-background-default shadow-tremor-dropdown border-tremor-border-default border",
    )}
  >
    {children}
  </div>
);

export interface ChartTooltipRowProps {
  value: string;
  name: string;
}

export const ChartTooltipRow = ({ value, name }: ChartTooltipRowProps) => (
  <div className="flex items-center justify-between space-x-8">
    <div className="flex items-center space-x-2">
      <p className={tremorTwMerge("text-tremor-content-default text-right whitespace-nowrap")}>
        {name}
      </p>
    </div>
    <p
      className={tremorTwMerge(
        "text-tremor-content-emphasis text-right font-medium whitespace-nowrap tabular-nums",
      )}
    >
      {value}
    </p>
  </div>
);

export interface ScatterChartTooltipProps {
  label: string;
  categoryColors: Map<string, Color | string>;
  active: boolean | undefined;
  payload: any;
  valueFormatter: ScatterChartValueFormatter;
  axis: any;
  category?: string;
}

const ScatterChartTooltip = ({
  label,
  active,
  payload,
  valueFormatter,
  axis,
  category,
  categoryColors,
}: ScatterChartTooltipProps) => {
  if (active && payload) {
    return (
      <ChartTooltipFrame>
        <div
          className={tremorTwMerge(
            "border-tremor-border-default flex items-center space-x-2 border-b px-4 py-2",
          )}
        >
          <span
            className={tremorTwMerge(
              "rounded-tremor-full border-tremor-background-default shadow-tremor-card h-3 w-3 shrink-0 border-2",
              bgColors[
                category
                  ? ((categoryColors.get(payload?.[0]?.payload[category]) as Color) ??
                    ("blue" as Color))
                  : ("blue" as Color)
              ],
            )}
          />
          <p className={tremorTwMerge("text-tremor-content-emphasis font-medium")}>{label}</p>
        </div>

        <div className={tremorTwMerge("space-y-1 px-4 py-2")}>
          {payload.map(({ value, name }: { value: number; name: string }, idx: number) => {
            const valueFormatterKey = Object.keys(axis).find((key) => axis[key] === name) ?? "";
            const valueFormatterFn =
              valueFormatter[valueFormatterKey as keyof ScatterChartValueFormatter] ??
              defaultValueFormatter;
            return (
              <ChartTooltipRow
                key={`id-${idx}`}
                value={valueFormatter && valueFormatterFn ? valueFormatterFn(value) : `${value}`}
                name={name}
              />
            );
          })}
        </div>
      </ChartTooltipFrame>
    );
  }
  return null;
};

export default ScatterChartTooltip;
