import React from "react";
import BaseChartProps from "../common/BaseChartProps";
import { CurveType } from "../../../lib/inputTypes";
export interface AreaChartProps extends BaseChartProps {
    stack?: boolean;
    curveType?: CurveType;
    connectNulls?: boolean;
    showGradient?: boolean;
}
declare const AreaChart: React.ForwardRefExoticComponent<AreaChartProps & React.RefAttributes<HTMLDivElement>>;
export default AreaChart;
