import React from "react";
import { Color } from "../../../lib";
export interface MarkerBarProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number;
    minValue?: number;
    maxValue?: number;
    markerTooltip?: string;
    rangeTooltip?: string;
    showAnimation?: boolean;
    color?: Color;
}
declare const MarkerBar: React.ForwardRefExoticComponent<MarkerBarProps & React.RefAttributes<HTMLDivElement>>;
export default MarkerBar;
