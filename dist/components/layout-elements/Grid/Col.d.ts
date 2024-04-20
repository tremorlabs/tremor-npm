import React from "react";
export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
    numColSpan?: number;
    numColSpanSm?: number;
    numColSpanMd?: number;
    numColSpanLg?: number;
}
declare const Col: React.ForwardRefExoticComponent<ColProps & React.RefAttributes<HTMLDivElement>>;
export default Col;
