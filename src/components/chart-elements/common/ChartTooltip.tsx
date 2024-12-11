import { bgColors } from "components/spark-elements/common/style";
import { Color, ValueFormatter, tremorTwMerge } from "lib";
import React from "react";

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
  color: Color | string;
}

export const ChartTooltipRow = ({ value, name, color }: ChartTooltipRowProps) => (
  <div className="flex items-center justify-between space-x-8">
    <div className="flex items-center space-x-2">
      <span
        className={tremorTwMerge(
          "rounded-tremor-full border-tremor-background-default shadow-tremor-card h-3 w-3 shrink-0 border-2",
          bgColors[color as Color],
        )}
      />
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
        <div className={tremorTwMerge("border-tremor-border-default border-b px-4 py-2")}>
          <p className={tremorTwMerge("text-tremor-content-emphasis font-medium")}>{label}</p>
        </div>

        <div className={tremorTwMerge("space-y-1 px-4 py-2")}>
          {filteredPayload.map(({ value, name }: { value: number; name: string }, idx: number) => (
            <ChartTooltipRow
              key={`id-${idx}`}
              value={valueFormatter(value)}
              name={name}
              color={categoryColors.get(name) ?? "brand"}
            />
          ))}
        </div>
      </ChartTooltipFrame>
    );
  }
  return null;
};

export default ChartTooltip;
