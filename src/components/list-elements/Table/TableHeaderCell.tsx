import React from 'react';

import {
    TextAlignments,
    classNames,
    defaultColors,
    fontWeight,
    getColorVariantsFromColorThemeValue,
    parseTextAlignment,
    spacing,
} from 'lib';
import { TextAlignment } from '../../../lib/inputTypes';
import TremorBaseProps from '../../../lib/TremorBaseProps';

interface TableHeaderCellProps extends TremorBaseProps {
    textAlignment?: TextAlignment,
    children: React.ReactNode,
}

const TableHeaderCell = ({
    textAlignment = TextAlignments.Left,
    className = '',
    children,
}: TableHeaderCellProps) => (
    <>
        <th className={ classNames(
            'tr-sticky tr-whitespace-nowrap',
            parseTextAlignment(textAlignment),
            getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
            spacing.none.top,
            spacing.twoXl.paddingLeft,
            spacing.twoXl.paddingRight,
            spacing.xl.paddingTop,
            spacing.xl.paddingBottom,
            fontWeight.lg,
            className,
        ) }>
            { children }
        </th>
    </>
);

export default TableHeaderCell;
