import { classNames, parseTextColorClassNames } from '@utils/classname-utils';
import React from 'react';

export interface BreadcrumbItemProps {
    href?: string,
    Icon?: React.ElementType,
    children: React.ReactNode,
}

const BreadcrumbItem = ({
    children,
    href = '#',
    Icon
}: BreadcrumbItemProps) => (
    <a
        className={ classNames(
            'flex justify-between items-center text-sm',
        ) }
        href={ href }
    >
        { Icon ? (
            <Icon className={ classNames(
                'h-5 w-5 mr-2 text-gray-400 flex-none'
            ) } aria-hidden="true"/>
        ) : null }
            <span className="max-w-[7rem] truncate"> { children } </span>
    </a>
);

export default BreadcrumbItem;

