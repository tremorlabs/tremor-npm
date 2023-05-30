import React from "react";
import { tremorTwMerge } from "../../../lib";

import { Color, ValueFormatter } from "../../../lib";
import { BaseColors, border, getColorClassNames, sizing, spacing } from "lib";
import { colorPalette } from "lib/theme";

export const ChartTooltipFrame = ({ children }: { children: React.ReactNode }) => (
  <div
    className={tremorTwMerge(
      // light
      "bg-tremor-background text-tremor-default rounded-tremor-default shadow-tremor-dropdown border-tremor-border",
      // dark
      "dark:bg-dark-tremor-background dark:text-dark-tremor-default dark:rounded-dark-tremor-default dark:shadow-dark-tremor-dropdown dark:border-dark-tremor-border",
      border.sm.all,
    )}
  >
    {children}
  </div>
);

export interface ChartTooltipRowProps {
  value: string;
  name: string;
  color: Color;
}

export const ChartTooltipRow = ({ value, name, color }: ChartTooltipRowProps) => (
  <div className="flex items-center justify-between space-x-8">
    <div className="flex items-center space-x-2">
      <span
        className={tremorTwMerge(
          // common
          "shrink-0",
          // light
          "rounded-tremor-full border-tremor-background shadow-tremor-card",
          // dark
          "dark:rounded-dark-tremor-full dark:border-dark-tremor-background dark:shadow-dark-tremor-card",
          getColorClassNames(color, colorPalette.background).bgColor,
          sizing.sm.height,
          sizing.sm.width,
          border.md.all,
        )}
      />
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
);

export interface ChartTooltipProps {
  active: boolean | undefined;
  payload: any;
  label: string;
  categoryColors: Map<string, Color>;
  valueFormatter: ValueFormatter;
}

const ChartTooltip = ({
  active,
  payload,
  label,
  categoryColors,
  valueFormatter,
}: ChartTooltipProps) => {
  if (active && payload) {
    return (
      <ChartTooltipFrame>
        <div
          className={tremorTwMerge(
            // light
            "border-tremor-border",
            // dark
            "dark:border-dark-tremor-border",
            spacing.twoXl.paddingX,
            spacing.sm.paddingY,
            border.sm.bottom,
          )}
        >
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
          {payload.map(({ value, name }: { value: number; name: string }, idx: number) => (
            <ChartTooltipRow
              key={`id-${idx}`}
              value={valueFormatter(value)}
              name={name}
              color={categoryColors.get(name) ?? BaseColors.Blue}
            />
          ))}
        </div>
      </ChartTooltipFrame>
    );
  }
  return null;
};

export default ChartTooltip;
