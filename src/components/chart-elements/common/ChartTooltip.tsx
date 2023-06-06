import React from "react";
import { twMerge } from "tailwind-merge";

import { Color, ValueFormatter } from "../../../lib";
import {
  BaseColors,
  border,
  borderRadius,
  boxShadow,
  getColorClassNames,
  fontSize,
  fontWeight,
  sizing,
  spacing,
} from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

export const ChartTooltipFrame = ({ children }: { children: React.ReactNode }) => (
  <div
    className={twMerge(
      getColorClassNames("white").bgColor,
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
  color: Color;
}

export const ChartTooltipRow = ({ value, name, color }: ChartTooltipRowProps) => (
  <div className="flex items-center justify-between space-x-8">
    <div className="flex items-center space-x-2">
      <span
        className={twMerge(
          "shrink-0",
          getColorClassNames(color, colorPalette.background).bgColor,
          getColorClassNames("white").borderColor,
          sizing.sm.height,
          sizing.sm.width,
          borderRadius.full.all,
          border.md.all,
          boxShadow.md,
        )}
      />
      <p
        className={twMerge(
          "text-right whitespace-nowrap",
          getColorClassNames(DEFAULT_COLOR, colorPalette.text).textColor,
          fontWeight.sm,
        )}
      >
        {name}
      </p>
    </div>
    <p
      className={twMerge(
        "font-medium tabular-nums text-right whitespace-nowrap",
        getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor,
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
            getColorClassNames(DEFAULT_COLOR, colorPalette.lightBorder).borderColor,
            spacing.twoXl.paddingX,
            spacing.sm.paddingY,
            border.sm.bottom,
          )}
        >
          <p
            className={twMerge(
              "text-elem",
              getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor,
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
