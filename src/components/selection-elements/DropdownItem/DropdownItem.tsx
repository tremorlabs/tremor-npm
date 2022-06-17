import React from 'react';

import { classNames } from '@utils/classname-utils';

export interface DropdownItemProps {
    value: any,
    name: string,
    Icon?: React.ElementType,
    shortcut?: string,
    isActive?: boolean, 
    setSelectedItem?: React.Dispatch<React.SetStateAction<any>>,
    setShowModal?: React.Dispatch<React.SetStateAction<boolean>>,
}

const DropdownItem = ({
    value,
    name,
    Icon,
    shortcut,
    isActive = false,
    setSelectedItem,
}: DropdownItemProps) => (
    <div>
        <button
            className={ classNames(
                isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                `group flex items-center justify-between px-4 py-2.5 space-x-10 text-sm w-full
                 group-hover:text-gray-500 hover:bg-gray-50 text-left`
            ) }
            value={ value }
            onClick={ () => setSelectedItem!(value) }
        >
            <div className="flex font-medium">
                { Icon ? (
                    <Icon className={ classNames(
                        'mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                    ) }/>
                ) : null }
                { name }
            </div>
            { shortcut ? <span className="font-normal text-gray-400">{ shortcut }</span> : null}
        </button>
    </div>
);

export default DropdownItem;
