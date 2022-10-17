import React from 'react';

import { classNames, fontSize } from 'lib';

export interface ItalicProps {
    children: React.ReactNode;
}

const Italic = ({
    children
}: ItalicProps) => {
    return(
        <span className={ classNames(
            'tremor-base tr-italic tr-text-inherit',
            fontSize.sm,
        ) }
        >
            { children }
        </span>
    );
};

export default Italic;
