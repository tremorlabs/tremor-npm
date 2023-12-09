import React from "react";
import { tremorTwMerge } from "../../../lib";

import { BaseColors, border, getColorClassNames, sizing, spacing } from "lib";
import { colorPalette } from "lib/theme";
import { Color, ValueFormatter } from "../../../lib";

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
  color: Color | string;
}

export const ChartTooltipRow = ({ value, name, color }: ChartTooltipRowProps) => (
  <div className="flex items-center justify-between space-x-8">
    <div className="flex items-center space-x-2">
      <span
        className={tremorTwMerge(
          // common
          "shrink-0 rounded-tremor-full",
          // light
          "border-tremor-background shadow-tremor-card",
          // dark
          "dark:border-dark-tremor-background dark:shadow-dark-tremor-card",
          getColorClassNames(color, colorPalette.background).bgColor,
          sizing.sm.height,
          sizing.sm.width,
          border.md.all,
        )}
      />
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

export interface ChartTooltipProps {
  active: boolean | undefined;
  payload: any;
  label: string;
  categoryColors: Map<string, Color | string>;
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
    const filteredPayload = payload.filter((item: any) => item.type !== "none");

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
          {filteredPayload.map(({ value, name }: { value: number; name: string }, idx: number) => (
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
