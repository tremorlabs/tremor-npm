import React from 'react';

import { classNames, defaultColors, fontWeight, getColorVariantsFromColorThemeValue } from 'lib';
import TremorBaseProps from '../../../lib/TremorBaseProps';

interface TableHeadProps extends TremorBaseProps {
    children: React.ReactElement[] | React.ReactElement
}

const TableHead = ({
    className = '',
    children,
}: TableHeadProps) => (
    <>
        <thead className={ classNames(
            'tr-text-left',
            getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
            fontWeight.lg,
            className,
        ) }>
            { children }
        </thead>
    </>
);

export default TableHead;
