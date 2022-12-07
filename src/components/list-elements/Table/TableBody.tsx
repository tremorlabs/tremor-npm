import React from 'react';

import { classNames, defaultColors, getColorVariantsFromColorThemeValue } from 'lib';
import TremorBaseProps from '../../../lib/TremorBaseProps';

interface TableBodyProps extends TremorBaseProps {
    children: React.ReactElement[] | React.ReactElement,
}

const TableBody = ({
    className = '',
    children,
}: TableBodyProps) => (
    <>
        <tbody className={ classNames(
            'tr-align-top tr-overflow-x-auto tr-divide-y',
            getColorVariantsFromColorThemeValue(defaultColors.lightBorder).divideColor,
            className,
        ) }>
            { children }
        </tbody>
    </>
);

export default TableBody;
