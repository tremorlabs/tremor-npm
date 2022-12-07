import React from 'react';

import TremorBaseProps from '../../../lib/TremorBaseProps';

export interface TableRowProps extends TremorBaseProps {
    children: React.ReactNode
}

const TableRow = ({
    className = '',
    children
}: TableRowProps) => {
    return(
        <>
            <tr className={ className }>
                { children }
            </tr>
        </>
    );
};

export default TableRow;
