import React from "react";
import BaseSparkChartProps from "../common/BaseSparkChartProps";
export interface SparkBarChartProps extends BaseSparkChartProps {
    stack?: boolean;
    relative?: boolean;
}
declare const SparkBarChart: React.ForwardRefExoticComponent<SparkBarChartProps & React.RefAttributes<HTMLDivElement>>;
export default SparkBarChart;
