import React from "react";
import { tremorTwMerge } from "../../../lib";

import { Color, ValueFormatter } from "../../../lib";
import { BaseColors, border, getColorClassNames, sizing, spacing } from "lib";
import { colorPalette } from "lib/theme";
import DeltaCalculationProps from "components/chart-elements/common/DeltaCalculationProps";

type TooltipValueColors = "text-emerald-600 dark:text-emerald-500" | "text-red-600 dark:text-red-500" | "text-gray-500 dark:text-white";

function getTooltipValueColor (value: number): TooltipValueColors {
  if (value > 0) {
    return "text-emerald-600 dark:text-emerald-500";
  } else if (value < 0) {
    return "text-red-600 dark:text-red-500";
  } else {
    return "text-gray-500 dark:text-white";
  }
}

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
  color: Color;
  textColor?: TooltipValueColors | null;
}

const getRangePayloadValue = (payload: any, dataKey: string) =>
  payload.find((e: any) => e.dataKey === dataKey)?.value ?? 0;

export const ChartTooltipRow = ({ value, name, color, textColor }: ChartTooltipRowProps) => (
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
        "font-medium tabular-nums text-right whitespace-nowrap tabular-nums tracking-tight",
        // light
        "text-tremor-content-emphasis",
        // dark
        "dark:text-dark-tremor-content-emphasis",
        textColor ? textColor : "",
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
  categoryColors: Map<string, Color>;
  valueFormatter: ValueFormatter;
  deltaCalculation?: DeltaCalculationProps | null;
}

const ChartTooltip = ({
  active,
  payload,
  label,
  categoryColors,
  valueFormatter,
  deltaCalculation,
}: ChartTooltipProps) => {
  const hasRange = Boolean(deltaCalculation?.leftArea && deltaCalculation?.rightArea);

  if (
    hasRange &&
    deltaCalculation?.leftArea?.activeLabel === deltaCalculation?.rightArea?.activeLabel
  )
    return null;

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
            {hasRange
              ? deltaCalculation?.leftArea?.chartX < deltaCalculation?.rightArea?.chartX
                ? `${deltaCalculation?.leftArea?.activeLabel} - ${deltaCalculation?.rightArea?.activeLabel}`
                : `${deltaCalculation?.rightArea?.activeLabel} - ${deltaCalculation?.leftArea?.activeLabel}`
              : label}
          </p>
        </div>

        <div className={tremorTwMerge(spacing.twoXl.paddingX, spacing.sm.paddingY, "space-y-1")}>
          {filteredPayload.map(({ value, name }: { value: number; name: string }, idx: number) => {
            const rightRangePayloadValue = hasRange && getRangePayloadValue(deltaCalculation?.rightArea?.activePayload, name);
            const leftRangePayloadValue = hasRange && getRangePayloadValue(deltaCalculation?.leftArea?.activePayload, name);
            
            const isBeforeLeftValue =
              deltaCalculation?.leftArea?.chartX > deltaCalculation?.rightArea?.chartX;
            const displayedValue = hasRange
              ? (rightRangePayloadValue -
                  leftRangePayloadValue) *
                (isBeforeLeftValue ? -1 : 1)
              : value;
            const percentage = hasRange
              ? (100 -
                  (isBeforeLeftValue
                    ? leftRangePayloadValue /
                      rightRangePayloadValue
                    : (rightRangePayloadValue /
                        leftRangePayloadValue) *
                      100)) *
                -1
              : 0;
            const percentageValue = hasRange ? `(${percentage > 0 ? "+" : ""}${percentage.toFixed(1)}%)` : "";

            return (
              <ChartTooltipRow
                key={`id-${idx}`}
                value={`${valueFormatter(displayedValue)} ${percentageValue}`}
                name={name}
                color={categoryColors.get(name) ?? BaseColors.Blue}
                textColor={hasRange ? getTooltipValueColor(displayedValue) : null}
              />
            );
          })}
        </div>
      </ChartTooltipFrame>
    );
  }
  return null;
};

export default ChartTooltip;
