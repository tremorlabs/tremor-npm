import React from "react";
import { Color } from "../../../lib";
export interface CategoryBarProps extends React.HTMLAttributes<HTMLDivElement> {
    values: number[];
    colors?: Color[];
    markerValue?: number;
    showLabels?: boolean;
    tooltip?: string;
    showAnimation?: boolean;
}
declare const CategoryBar: React.ForwardRefExoticComponent<CategoryBarProps & React.RefAttributes<HTMLDivElement>>;
export default CategoryBar;
