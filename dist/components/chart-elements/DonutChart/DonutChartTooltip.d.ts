import React from "react";
import { ValueFormatter } from "lib";
export interface DonutChartTooltipProps {
    active: boolean | undefined;
    payload: any;
    valueFormatter: ValueFormatter;
}
export declare const DonutChartTooltip: ({ active, payload, valueFormatter }: DonutChartTooltipProps) => React.JSX.Element | null;
