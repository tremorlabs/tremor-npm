import React from "react";
import { Color } from "../../../lib/inputTypes";
export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number;
    label?: string;
    tooltip?: string;
    showAnimation?: boolean;
    color?: Color;
}
declare const ProgressBar: React.ForwardRefExoticComponent<ProgressBarProps & React.RefAttributes<HTMLDivElement>>;
export default ProgressBar;
