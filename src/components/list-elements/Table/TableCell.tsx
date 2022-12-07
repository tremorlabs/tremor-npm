import React from 'react';

import {
    TextAlignments,
    classNames,
    parseTextAlignment,
    spacing,
} from 'lib';
import { TextAlignment } from '../../../lib/inputTypes';
import TremorBaseProps from '../../../lib/TremorBaseProps';

export interface TableCellProps extends TremorBaseProps {
    textAlignment?: TextAlignment,
    children: React.ReactNode
}

const TableCell = ({
    textAlignment = TextAlignments.Left,
    className = '',
    children
}: TableCellProps) => {
    return(
        <>
            <td className={ classNames(
                'tr-align-middle tr-whitespace-nowrap tr-tabular-nums',
                parseTextAlignment(textAlignment),
                spacing.twoXl.paddingLeft,
                spacing.twoXl.paddingRight,
                spacing.twoXl.paddingTop,
                spacing.twoXl.paddingBottom,
                className,
            )}>
                { children }
            </td>
        </>
    );
};

export default TableCell;
