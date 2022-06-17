import React from 'react';

export interface AccordionBodyProps {
    children: React.ReactNode;
}

const AccordionBody = ({
    children
}: AccordionBodyProps) => {
    return(
        <div className="w-full px-4 pb-4">
            { children }
        </div>
    );
};

export default AccordionBody;
