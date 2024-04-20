import React from "react";
import { ScatterChartValueFormatter } from "components/chart-elements/ScatterChart/ScatterChart";
import { Color } from "lib";
export declare const ChartTooltipFrame: ({ children }: {
    children: React.ReactNode;
}) => React.JSX.Element;
export interface ChartTooltipRowProps {
    value: string;
    name: string;
}
export declare const ChartTooltipRow: ({ value, name }: ChartTooltipRowProps) => React.JSX.Element;
export interface ScatterChartTooltipProps {
    label: string;
    categoryColors: Map<string, Color | string>;
    active: boolean | undefined;
    payload: any;
    valueFormatter: ScatterChartValueFormatter;
    axis: any;
    category?: string;
}
declare const ScatterChartTooltip: ({ label, active, payload, valueFormatter, axis, category, categoryColors, }: ScatterChartTooltipProps) => React.JSX.Element | null;
export default ScatterChartTooltip;
