import React from "react";

import { ScatterChartValueFormatter } from "components/chart-elements/ScatterChart/ScatterChart";
import {
  BaseColors,
  getColorClassNames,
  Color,
  defaultValueFormatter,
  tremorTwMerge,
  colorPalette,
} from "lib";

export const ChartTooltipFrame = ({ children }: { children: React.ReactNode }) => (
  <div
    className={tremorTwMerge(
      // common
      "rounded-tremor-default text-tremor-default border",
      // light
      "bg-tremor-background shadow-tremor-dropdown border-tremor-border",
      // dark
      "dark:bg-dark-tremor-background dark:shadow-dark-tremor-dropdown dark:border-dark-tremor-border",
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
      <p
        className={tremorTwMerge(
          // commmon
          "text-right whitespace-nowrap",
          // light
          "text-tremor-content",
          // dark
          "dark:text-dark-tremor-content",
        )}
      >
        {name}
      </p>
    </div>
    <p
      className={tremorTwMerge(
        // common
        "text-right font-medium whitespace-nowrap tabular-nums",
        // light
        "text-tremor-content-emphasis",
        // dark
        "dark:text-dark-tremor-content-emphasis",
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
            // common
            "flex items-center space-x-2 border-b px-4 py-2",
            // light
            "border-tremor-border",
            // dark
            "dark:border-dark-tremor-border",
          )}
        >
          <span
            className={tremorTwMerge(
              // common
              "rounded-tremor-full h-3 w-3 shrink-0 border-2",
              // light
              "border-tremor-background shadow-tremor-card",
              // dark
              "dark:border-dark-tremor-background dark:shadow-dark-tremor-card",
              getColorClassNames(
                category
                  ? (categoryColors.get(payload?.[0]?.payload[category]) ?? BaseColors.Blue)
                  : BaseColors.Blue,
                colorPalette.background,
              ).bgColor,
            )}
          />
          <p
            className={tremorTwMerge(
              // common
              "font-medium",
              // light
              "text-tremor-content-emphasis",
              // dark
              "dark:text-dark-tremor-content-emphasis",
            )}
          >
            {label}
          </p>
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
