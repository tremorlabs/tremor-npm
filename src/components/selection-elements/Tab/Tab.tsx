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
                        `border-gray-500 text-gray-700 ${parseTextColorClassNames(activeTextColor)}`
                    ) : (
                        `border-transparent hover:border-gray-300 ${parseTextColorClassNames(textColor)} hover:${activeTextColor}`
                    ),
                    'flex whitespace-nowrap font-normal py-4 px-1 border-b-2 -mb-px text-sm group max-w-xs'
                ) }
                value={ value }
                onClick={ () => setSelectedTab!(value) }
            >
                { Icon ? (
                    <Icon className={ classNames(
                        'h-5 w-5 mr-2 text-gray-400 flex-none'
                    ) } aria-hidden="true"/>
                ) : null }
                <span className="truncate"> { name } </span>
            </button>
        </li>
    );
};

export default Tab;
