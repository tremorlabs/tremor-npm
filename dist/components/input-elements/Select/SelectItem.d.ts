import React from "react";
export interface SelectItemProps extends React.HTMLAttributes<HTMLLIElement> {
    value: string;
    icon?: React.ElementType;
}
declare const SelectItem: React.ForwardRefExoticComponent<SelectItemProps & React.RefAttributes<HTMLLIElement>>;
export default SelectItem;
