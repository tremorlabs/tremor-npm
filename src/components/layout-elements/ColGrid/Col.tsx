import React from 'react';

import {
    GridClassesMapping,
    colSpan,
    colSpanLg,
    colSpanMd,
    colSpanSm
} from './styles';
import { classNames } from 'lib';

const getColSpan = (
    numColSpan: number | undefined,
    colSpanMapping: GridClassesMapping
): string => {
    if (!numColSpan) return '';
    if (!Object.keys(colSpanMapping).includes(String(numColSpan))) return '';
    return colSpanMapping[numColSpan];
};

const getColSpanClassNames = (
    numColSpan: number,
    numColSpanSm?: number,
    numColSpanMd?: number,
    numColSpanLg?: number,
) => {
    const spanBase = getColSpan(numColSpan, colSpan);
    const spanSm = getColSpan(numColSpanSm, colSpanSm);
    const spanMd = getColSpan(numColSpanMd, colSpanMd);
    const spanLg = getColSpan(numColSpanLg, colSpanLg);

    return classNames(spanBase, spanSm, spanMd, spanLg);
};

export interface ColProps {
    numColSpan?: number,
    numColSpanSm?: number,
    numColSpanMd?: number,
    numColSpanLg?: number,
    className?: string,
    children: React.ReactNode,
}

const Col = ({
    numColSpan = 1,
    numColSpanSm,
    numColSpanMd,
    numColSpanLg,
    className = '',
    children,
}: ColProps) => {
    return (
        <div className={ classNames(
            getColSpanClassNames(
                numColSpan,
                numColSpanSm,
                numColSpanMd,
                numColSpanLg,
            ),
            className,
        ) }>
            { children }
        </div>
    );
};

export default Col;
