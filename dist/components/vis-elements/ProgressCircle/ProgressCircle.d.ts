import { Color } from "lib";
import React from "react";
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export interface ProgressCircleProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number;
    size?: Size;
    color?: Color;
    showAnimation?: boolean;
    tooltip?: string;
    radius?: number;
    strokeWidth?: number;
    children?: React.ReactNode;
}
declare const ProgressCircle: React.ForwardRefExoticComponent<ProgressCircleProps & React.RefAttributes<HTMLDivElement>>;
export default ProgressCircle;
