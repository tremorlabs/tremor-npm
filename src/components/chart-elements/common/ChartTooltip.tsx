import React from "react";
import { twMerge } from "tailwind-merge";

import { Color, ValueFormatter } from "../../../lib";
import {
  border,
  borderRadius,
  boxShadow,
  defaultColors,
  fontSize,
  fontWeight,
  getColor,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
} from "lib";

export const ChartTooltipFrame = ({ children }: { children: React.ReactNode }) => (
  <div
    className={twMerge(
      getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
      fontSize.sm,
      borderRadius.md.all,
      border.sm.all,
      boxShadow.lg,
    )}
  >
    {children}
  </div>
);

export interface ChartTooltipRowProps {
  value: string;
  name: string;
  color: Color | null | undefined;
}

export const ChartTooltipRow = ({ value, name, color }: ChartTooltipRowProps) => (
  <div className="flex items-center justify-between space-x-8">
    <div className="flex items-center space-x-2">
      <span
        className={twMerge(
          "shrink-0",
          getColorVariantsFromColorThemeValue(getColor(color).background).bgColor,
          getColorVariantsFromColorThemeValue(defaultColors.white).borderColor,
          sizing.sm.height,
          sizing.sm.width,
          borderRadius.full.all,
          border.md.all,
          boxShadow.md,
        )}
      />
      <p
        className={twMerge(
          "font-medium tabular-nums text-right whitespace-nowrap",
          getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
        )}
      >
        {value}
      </p>
    </div>
    <p
      className={twMerge(
        "text-right whitespace-nowrap",
        getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
        fontWeight.sm,
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
          className={twMerge(
            getColorVariantsFromColorThemeValue(defaultColors.lightBorder).borderColor,
            spacing.twoXl.paddingX,
            spacing.sm.paddingY,
            border.sm.bottom,
          )}
        >
          <p
            className={twMerge(
              "text-elem",
              getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
              fontWeight.md,
            )}
          >
            {label}
          </p>
        </div>

        <div className={twMerge(spacing.twoXl.paddingX, spacing.sm.paddingY, "space-y-1")}>
          {payload.map(({ value, name }: { value: number; name: string }, idx: number) => (
            <ChartTooltipRow
              key={`id-${idx}`}
              value={valueFormatter(value)}
              name={name}
              color={categoryColors.get(name)}
            />
          ))}
        </div>
      </ChartTooltipFrame>
    );
  }
  return null;
};

export default ChartTooltip;
