import React from "react";
export interface DeltaBarProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number;
    isIncreasePositive?: boolean;
    tooltip?: string;
    showAnimation?: boolean;
}
declare const DeltaBar: React.ForwardRefExoticComponent<DeltaBarProps & React.RefAttributes<HTMLDivElement>>;
export default DeltaBar;
