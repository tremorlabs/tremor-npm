import React from 'react';

export interface AccordionBodyProps {
    children: React.ReactNode;
}

const AccordionBody = ({
    children
}: AccordionBodyProps) => {
    return(
        <div className="w-full px-2 py-2">
            { children }
        </div>
    );
};

export default AccordionBody;
