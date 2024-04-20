import React from "react";
import { Color } from "lib";
export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    icon?: React.ElementType;
    color?: Color;
}
declare const Callout: React.ForwardRefExoticComponent<CalloutProps & React.RefAttributes<HTMLDivElement>>;
export default Callout;
