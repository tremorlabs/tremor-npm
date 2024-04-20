import React from "react";
export interface AccordionListProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactElement[] | React.ReactElement;
}
declare const AccordionList: React.ForwardRefExoticComponent<AccordionListProps & React.RefAttributes<HTMLDivElement>>;
export default AccordionList;
