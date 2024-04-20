import React from "react";
import { Color, IconVariant, Size } from "../../../lib";
export declare const IconVariants: {
    [key: string]: IconVariant;
};
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
    icon: React.ElementType;
    variant?: IconVariant;
    tooltip?: string;
    size?: Size;
    color?: Color;
}
declare const Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<HTMLSpanElement>>;
export default Icon;
