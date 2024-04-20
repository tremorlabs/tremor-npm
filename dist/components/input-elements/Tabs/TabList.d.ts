import React from "react";
import { Color } from "lib";
export type TabVariant = "line" | "solid";
export declare const TabVariantContext: React.Context<TabVariant>;
export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: Color;
    variant?: TabVariant;
    children: React.ReactElement[] | React.ReactElement;
}
declare const TabList: React.ForwardRefExoticComponent<TabListProps & React.RefAttributes<HTMLDivElement>>;
export default TabList;
