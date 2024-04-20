import React from "react";
import { Color, ValueFormatter } from "lib";
export declare const ChartTooltipFrame: ({ children }: {
    children: React.ReactNode;
}) => React.JSX.Element;
export interface ChartTooltipRowProps {
    value: string;
    name: string;
    color: Color | string;
}
export declare const ChartTooltipRow: ({ value, name, color }: ChartTooltipRowProps) => React.JSX.Element;
export interface ChartTooltipProps {
    active: boolean | undefined;
    payload: any;
    label: string;
    categoryColors: Map<string, Color | string>;
    valueFormatter: ValueFormatter;
}
declare const ChartTooltip: ({ active, payload, label, categoryColors, valueFormatter, }: ChartTooltipProps) => React.JSX.Element | null;
export default ChartTooltip;
