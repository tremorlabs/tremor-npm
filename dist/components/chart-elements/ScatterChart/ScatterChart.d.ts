import React from "react";
import type { EventProps } from "components/chart-elements/common";
import BaseAnimationTimingProps from "../common/BaseAnimationTimingProps";
import { CustomTooltipProps } from "components/chart-elements/common/CustomTooltipProps";
import { Color, ValueFormatter, IntervalType } from "../../../lib/inputTypes";
export type ScatterChartValueFormatter = {
    x?: ValueFormatter;
    y?: ValueFormatter;
    size?: ValueFormatter;
};
export interface ScatterChartProps extends BaseAnimationTimingProps, React.HTMLAttributes<HTMLDivElement> {
    data: any[];
    x: string;
    y: string;
    category: string;
    size?: string;
    valueFormatter?: ScatterChartValueFormatter;
    sizeRange?: number[];
    colors?: (Color | string)[];
    showOpacity?: boolean;
    startEndOnly?: boolean;
    showXAxis?: boolean;
    showYAxis?: boolean;
    yAxisWidth?: number;
    intervalType?: IntervalType;
    showTooltip?: boolean;
    showLegend?: boolean;
    showGridLines?: boolean;
    autoMinXValue?: boolean;
    minXValue?: number;
    maxXValue?: number;
    autoMinYValue?: boolean;
    minYValue?: number;
    maxYValue?: number;
    allowDecimals?: boolean;
    noDataText?: string;
    enableLegendSlider?: boolean;
    onValueChange?: (value: EventProps) => void;
    customTooltip?: React.ComponentType<CustomTooltipProps>;
    rotateLabelX?: {
        angle: number;
        verticalShift: number;
        xAxisHeight: number;
    };
    tickGap?: number;
}
declare const ScatterChart: React.ForwardRefExoticComponent<ScatterChartProps & React.RefAttributes<HTMLDivElement>>;
export default ScatterChart;
