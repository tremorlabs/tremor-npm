import React from 'react';

import { classNames, parseTextColorClassNames } from '@utils/classname-utils';

export interface TabProps {
    name: string,
    value: any,
    isActive?: boolean,
    textColor?: string,
    activeTextColor?: string,
    Icon?: React.ElementType,
    setSelectedTab?: React.Dispatch<React.SetStateAction<string>>,
}

const Tab = ({
    name,
    value,
    isActive,
    Icon,
    textColor = 'text-gray-400',
    activeTextColor = 'text-gray-500',
    setSelectedTab,
}: TabProps) => {
    return(
        <li>
            <button
                className={ classNames(
                    isActive ? (
                        `border-gray-500 font-medium ${parseTextColorClassNames(activeTextColor)}`
                    ) : (
                        `border-transparent font-medium hover:border-gray-300 ${parseTextColorClassNames(textColor)} hover:${activeTextColor}`
                    ),
                    'flex whitespace-nowrap py-4 px-1 border-b-2 -mb-px text-sm truncate group'
                ) }
                value={ value }
                onClick={ () => setSelectedTab!(value) }
            >
                { Icon ? (
                    <Icon className={ classNames(
                        'h-5 w-5 mr-3 text-gray-400 flex-none'
                    ) } aria-hidden="true"/>
                ) : null }
                { name }
            </button>
        </li>
    );
};

export default Tab;
