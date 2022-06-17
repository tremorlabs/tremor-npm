import React from 'react';

export interface AccordionBodySmallProps {
    children: React.ReactNode;
}

const AccordionBodySmall = ({
    children
}: AccordionBodySmallProps) => {
    return(
        <div className="w-full px-3 pb-3">
            { children }
        </div>
    );
};

export default AccordionBodySmall;