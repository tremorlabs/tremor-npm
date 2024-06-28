import React from "react";
import {
  BaseColors,
  getColorClassNames,
  tremorTwMerge,
  Color,
  ValueFormatter,
  colorPalette,
} from "lib";
import { Category } from "./types";

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
  color: Color | string;
  xAxisCount?: number;
}

export const ChartTooltipRow = ({ value, name, color, xAxisCount }: ChartTooltipRowProps) => (
  <div className="flex items-center justify-between space-x-8">
    <div className="flex items-center space-x-2">
      {!xAxisCount || xAxisCount === 1 ? (
        <span
          className={tremorTwMerge(
            // common
            "shrink-0 rounded-tremor-full border-2 h-3 w-3",
            // light
            "border-tremor-background shadow-tremor-card",
            // dark
            "dark:border-dark-tremor-background dark:shadow-dark-tremor-card",
            getColorClassNames(color, colorPalette.background).bgColor,
          )}
        />
      ) : null}
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
  valueFormatters: Record<Category, ValueFormatter>;
  index: string;
  xAxisCount: number;
}

const ChartTooltip = (props: ChartTooltipProps) => {
  const { active, payload, label, categoryColors, valueFormatters, index, xAxisCount } = props;
  if (active && payload) {
    const filteredPayload = payload.filter((item: any) => item.type !== "none");

    return (
      <ChartTooltipFrame>
        {xAxisCount === 1 ? (
          <div
            className={tremorTwMerge(
              // light
              "border-tremor-border border-b px-4 py-2",
              // dark
              "dark:border-dark-tremor-border",
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
        ) : null}

        <div className={tremorTwMerge("px-4 py-2 space-y-1")}>
          {filteredPayload.map(
            (
              {
                value,
                name,
                dataKey,
                payload,
              }: { value: number; name: string; dataKey: string; payload: any },
              idx: number,
            ) => (
              <ChartTooltipRow
                key={`id-${idx}`}
                value={valueFormatters[dataKey]?.(value)}
                name={xAxisCount === 1 ? name : `${name} - ${payload[index]}`}
                color={categoryColors.get(dataKey) ?? BaseColors.Blue}
                xAxisCount={xAxisCount}
              />
            ),
          )}
        </div>
      </ChartTooltipFrame>
    );
  }
  return null;
};

export default ChartTooltip;
