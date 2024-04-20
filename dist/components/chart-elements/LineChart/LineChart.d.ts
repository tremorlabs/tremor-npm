import React from "react";
import BaseChartProps from "../common/BaseChartProps";
import { CurveType } from "../../../lib/inputTypes";
export interface LineChartProps extends BaseChartProps {
    curveType?: CurveType;
    connectNulls?: boolean;
}
declare const LineChart: React.ForwardRefExoticComponent<LineChartProps & React.RefAttributes<HTMLDivElement>>;
export default LineChart;
