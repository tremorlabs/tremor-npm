import React from 'react';

import { classNames, fontSize, fontWeight } from 'lib';

export interface BoldProps {
    children: React.ReactNode
}

const Bold = ({
    children,
}: BoldProps) => {
    return(
        <span className={ classNames(
            'tremor-base tr-text-inherit',
            fontSize.sm,
            fontWeight.lg,
        ) }
        >
            { children }
        </span>
    );
};

export default Bold;
