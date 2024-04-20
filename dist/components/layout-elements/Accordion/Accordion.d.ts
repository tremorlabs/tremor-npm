import React from "react";
interface OpenContextValue {
    isOpen: boolean;
}
export declare const OpenContext: React.Context<OpenContextValue>;
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultOpen?: boolean;
}
declare const Accordion: React.ForwardRefExoticComponent<AccordionProps & React.RefAttributes<HTMLDivElement>>;
export default Accordion;
