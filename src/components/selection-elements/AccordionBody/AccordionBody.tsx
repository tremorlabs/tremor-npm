import React from 'react';

export interface AccordionBodyProps {
    children: React.ReactNode;
}

const AccordionBody = ({
    children
}: AccordionBodyProps) => {
    return(
        <div className="w-full pl-3 pr-14 pb-4">
            { children }
        </div>
    );
};

export default AccordionBody;
