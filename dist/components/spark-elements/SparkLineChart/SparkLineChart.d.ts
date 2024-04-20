import React from "react";
import { CurveType } from "../../../lib/inputTypes";
import BaseSparkChartProps from "../common/BaseSparkChartProps";
export interface SparkLineChartProps extends BaseSparkChartProps {
    curveType?: CurveType;
    connectNulls?: boolean;
}
declare const SparkLineChart: React.ForwardRefExoticComponent<SparkLineChartProps & React.RefAttributes<HTMLDivElement>>;
export default SparkLineChart;
