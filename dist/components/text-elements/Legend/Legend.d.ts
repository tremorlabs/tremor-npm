import React from "react";
import { Color } from "lib";
export interface LegendItemProps {
    name: string;
    color: Color | string;
    onClick?: (name: string, color: Color | string) => void;
    activeLegend?: string;
}
export interface ScrollButtonProps {
    icon: React.ElementType;
    onClick?: () => void;
    disabled?: boolean;
}
export interface LegendProps extends React.OlHTMLAttributes<HTMLOListElement> {
    categories: string[];
    colors?: (Color | string)[];
    onClickLegendItem?: (category: string, color: Color | string) => void;
    activeLegend?: string;
    enableLegendSlider?: boolean;
}
declare const Legend: React.ForwardRefExoticComponent<LegendProps & React.RefAttributes<HTMLOListElement>>;
export default Legend;
