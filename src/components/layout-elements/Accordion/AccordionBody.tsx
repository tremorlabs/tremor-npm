import React from 'react';

import { classNames, spacing } from 'lib';

export interface AccordionBodyProps {
    className?: string,
    children: React.ReactNode;
}

const AccordionBody = ({
    className = '',
    children
}: AccordionBodyProps) => {
    return(
        <div className={ classNames(
            'tr-w-full',
            spacing.threeXl.paddingLeft,
            spacing.threeXl.paddingRight,
            spacing.lg.paddingBottom,
            className,
        ) }>
            { children }
        </div>
    );
};

export default AccordionBody;
