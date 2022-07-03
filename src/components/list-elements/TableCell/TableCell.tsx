import React from 'react';

import { 
    classNames,
    parseTextAlignmentClassNames
} from '@utils/classname-utils';

export interface TableCellProps {
    textAlignment?: string,
    children: React.ReactNode
}

const TableCell = ({
    textAlignment = 'text-left',
    children
}: TableCellProps) => {
    return(
        <React.Fragment>
            <td className={ classNames(
                parseTextAlignmentClassNames(textAlignment),
                'py-4 px-4 truncate whitespace-nowrap'
            )}>
                { children }
            </td>
        </React.Fragment>
    );
};

export default TableCell;
