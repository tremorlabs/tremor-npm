import React from "react";
export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ElementType;
}
declare const Tab: React.ForwardRefExoticComponent<TabProps & React.RefAttributes<HTMLButtonElement>>;
export default Tab;
