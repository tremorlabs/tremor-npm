import React from 'react';

import { TableBody } from 'components';

export interface TableBodyProps {
    children: React.ReactElement[] | React.ReactElement;
}

const SmartTableBody = ({ children }: TableBodyProps) => (
    <TableBody>{children}</TableBody>
);

export default SmartTableBody;
