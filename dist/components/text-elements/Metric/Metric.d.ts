import React from "react";
import { Color } from "../../../lib";
export interface MetricProps extends React.HTMLAttributes<HTMLParagraphElement> {
    color?: Color;
}
declare const Metric: React.ForwardRefExoticComponent<MetricProps & React.RefAttributes<HTMLParagraphElement>>;
export default Metric;
