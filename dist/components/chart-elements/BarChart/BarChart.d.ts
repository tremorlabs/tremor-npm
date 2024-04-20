import React from "react";
import BaseChartProps from "../common/BaseChartProps";
export interface BarChartProps extends BaseChartProps {
    layout?: "vertical" | "horizontal";
    stack?: boolean;
    relative?: boolean;
}
declare const BarChart: React.ForwardRefExoticComponent<BarChartProps & React.RefAttributes<HTMLDivElement>>;
export default BarChart;
