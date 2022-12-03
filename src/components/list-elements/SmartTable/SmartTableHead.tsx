import React from 'react';

import { TableHead, TableRow } from 'components';

export interface TableHeadProps {
    children: React.ReactElement[] | React.ReactElement;
}

const SmartTableHead = ({ children }: TableHeadProps) => (
    <TableHead>
        <TableRow>{children}</TableRow>
    </TableHead>
);

export default SmartTableHead;
