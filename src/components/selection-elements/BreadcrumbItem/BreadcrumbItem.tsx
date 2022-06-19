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
            'flex justify-between items-center max-w-sm w-full text-base font-medium space-x-4',
        ) }
        href={ href }
    >
        { Icon ? (
            <Icon className={ classNames(
                'h-5 w-5 mr-2 text-gray-400 flex-none'
            ) } aria-hidden="true"/>
        ) : null }
        { children }
    </a>
);

export default BreadcrumbItem;

