import React from 'react';

import SmartTableBody from './SmartTableBody';
import SmartTableHead from './SmartTableHead';

import { Table, TableCell, TableHeaderCell, TableRow } from '../Table';
import { ValueFormatter } from 'lib';
import { defaultValueFormatter } from 'lib';

export interface SmartTableProps {
    data: any[];
    categories: string[];
    valueFormatter?: ValueFormatter;
}

const SmartTable = ({
    data = [],
    categories = [],
    valueFormatter = defaultValueFormatter,
}: SmartTableProps) => {
    function getTableHeads() {
        return categories.map((category, index) => (
            <TableHeaderCell key={index}>
                {category.toUpperCase()}
            </TableHeaderCell>
        ));
    }
    function getTableBody() {
        return data.map((row, index) => (
            <TableRow key={index}>
                {categories.map((category, index) => (
                    <TableCell key={index}>
                        {valueFormatter(row[category])}
                    </TableCell>
                ))}
            </TableRow>
        ));
    }
    return (
        <Table>
            <SmartTableHead>{getTableHeads()}</SmartTableHead>
            <SmartTableBody>{getTableBody()}</SmartTableBody>
        </Table>
    );
};

export default SmartTable;
