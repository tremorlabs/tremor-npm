import React from "react";
export interface TabGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultIndex?: number;
    index?: number;
    onIndexChange?: (index: number) => void;
    children: React.ReactElement[] | React.ReactElement;
}
declare const TabGroup: React.ForwardRefExoticComponent<TabGroupProps & React.RefAttributes<HTMLDivElement>>;
export default TabGroup;
