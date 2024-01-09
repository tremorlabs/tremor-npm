import React from "react";
import { tremorTwMerge, ValueFormatter } from "lib";

import { ChartTooltipFrame, ChartTooltipRow } from "components/chart-elements/common/ChartTooltip";

export interface DonutChartTooltipProps {
  active: boolean | undefined;
  payload: any;
  valueFormatter: ValueFormatter;
}

export const DonutChartTooltip = ({ active, payload, valueFormatter }: DonutChartTooltipProps) => {
  if (active && payload?.[0]) {
    const payloadRow = payload?.[0];
    return (
      <ChartTooltipFrame>
        <div className={tremorTwMerge("px-4 py-2")}>
          <ChartTooltipRow
            value={valueFormatter(payloadRow.value)}
            name={payloadRow.name}
            color={payloadRow.payload.color}
          />
        </div>
      </ChartTooltipFrame>
    );
  }
  return null;
};
