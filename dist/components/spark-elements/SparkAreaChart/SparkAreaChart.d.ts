import React from "react";
import { CurveType } from "../../../lib/inputTypes";
import BaseSparkChartProps from "../common/BaseSparkChartProps";
export interface SparkAreaChartProps extends BaseSparkChartProps {
    stack?: boolean;
    curveType?: CurveType;
    connectNulls?: boolean;
    showGradient?: boolean;
}
declare const AreaChart: React.ForwardRefExoticComponent<SparkAreaChartProps & React.RefAttributes<HTMLDivElement>>;
export default AreaChart;
