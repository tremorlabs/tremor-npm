import React from "react";
import { Color, defaultValueFormatter, tremorTwMerge } from "../../../lib";

import { ScatterChartValueFormatter } from "components/chart-elements/ScatterChart/ScatterChart";
import { BaseColors, border, getColorClassNames, sizing, spacing } from "lib";
import { colorPalette } from "lib/theme";

export const ChartTooltipFrame = ({ children }: { children: React.ReactNode }) => (
  <div
    className={tremorTwMerge(
      // common
      "rounded-tremor-default text-tremor-default",
      // light
      "bg-tremor-background shadow-tremor-dropdown border-tremor-border",
      // dark
      "dark:bg-dark-tremor-background dark:shadow-dark-tremor-dropdown dark:border-dark-tremor-border",
      border.sm.all,
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
        "font-medium tabular-nums text-right whitespace-nowrap",
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
            "flex items-center space-x-2",
            // light
            "border-tremor-border",
            // dark
            "dark:border-dark-tremor-border",
            spacing.twoXl.paddingX,
            spacing.sm.paddingY,
            border.sm.bottom,
          )}
        >
          <span
            className={tremorTwMerge(
              // common
              "shrink-0 rounded-tremor-full",
              // light
              "border-tremor-background shadow-tremor-card",
              // dark
              "dark:border-dark-tremor-background dark:shadow-dark-tremor-card",
              getColorClassNames(
                category
                  ? categoryColors.get(payload?.[0]?.payload[category]) ?? BaseColors.Blue
                  : BaseColors.Blue,
                colorPalette.background,
              ).bgColor,
              sizing.sm.height,
              sizing.sm.width,
              border.md.all,
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

        <div className={tremorTwMerge(spacing.twoXl.paddingX, spacing.sm.paddingY, "space-y-1")}>
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
