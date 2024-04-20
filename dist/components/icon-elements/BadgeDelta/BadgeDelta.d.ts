import React from "react";
import { DeltaType, Size } from "lib";
export interface BadgeDeltaProps extends React.HTMLAttributes<HTMLSpanElement> {
    deltaType?: DeltaType;
    isIncreasePositive?: boolean;
    size?: Size;
    tooltip?: string;
}
declare const BadgeDelta: React.ForwardRefExoticComponent<BadgeDeltaProps & React.RefAttributes<HTMLSpanElement>>;
export default BadgeDelta;
