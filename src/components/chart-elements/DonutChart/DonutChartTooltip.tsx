import React from "react";
import { tremorTwMerge } from "lib";

import { ChartTooltipFrame, ChartTooltipRow } from "components/chart-elements/common/ChartTooltip";
import { spacing } from "lib";
import { ValueFormatter } from "../../../lib/inputTypes";

export interface DonutChartTooltipProps {
  active: boolean | undefined;
  payload: any;
  valueFormatter: ValueFormatter;
  customTooltip?: (payload: any) => React.JSX.Element;
}

export const DonutChartTooltip = ({
  active,
  payload,
  valueFormatter,
  customTooltip = undefined,
}: DonutChartTooltipProps) => {
  if (active && payload[0]) {
    const payloadRow = payload[0];
    return (
      <ChartTooltipFrame>
        {customTooltip ? (
          customTooltip(payloadRow)
        ) : (
          <div className={tremorTwMerge(spacing.twoXl.paddingX, spacing.sm.paddingY)}>
            <ChartTooltipRow
              value={valueFormatter(payloadRow.value)}
              name={payloadRow.name}
              color={payloadRow.payload.color}
            />
          </div>
        )}
      </ChartTooltipFrame>
    );
  }
  return null;
};
