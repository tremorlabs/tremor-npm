import React from "react";
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    numItems?: number;
    numItemsSm?: number;
    numItemsMd?: number;
    numItemsLg?: number;
    children: React.ReactNode;
}
declare const Grid: React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>>;
export default Grid;
