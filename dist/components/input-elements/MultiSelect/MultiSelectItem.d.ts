import React from "react";
export interface MultiSelectItemProps extends React.HTMLAttributes<HTMLLIElement> {
    value: string;
}
declare const MultiSelectItem: React.ForwardRefExoticComponent<MultiSelectItemProps & React.RefAttributes<HTMLLIElement>>;
export default MultiSelectItem;
