import React from "react";
import { AlignItems, FlexDirection, JustifyContent } from "../../../lib";
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    flexDirection?: FlexDirection;
    justifyContent?: JustifyContent;
    alignItems?: AlignItems;
    children: React.ReactNode;
}
declare const Flex: React.ForwardRefExoticComponent<FlexProps & React.RefAttributes<HTMLDivElement>>;
export default Flex;
