import React from "react";
import { Color, Size } from "lib";
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    color?: Color;
    size?: Size;
    icon?: React.ElementType;
    tooltip?: string;
}
declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
export default Badge;
