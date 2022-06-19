import React from 'react';

import { isValueInArray } from '@utils/utils';
import { classNames } from '@utils/classname-utils';

export interface MultiSelectBoxItemProps {
    value: any,
    name: string,
    selectedItemsValues?: any[],
    isActive?: boolean, 
    setSelectedItemsValues?: React.Dispatch<React.SetStateAction<any[]>>,
}

const MultiSelectBoxItem = ({
    value,
    name,
    selectedItemsValues,
    isActive,
    setSelectedItemsValues,
}: MultiSelectBoxItemProps) => (
    <button
        className={ classNames(
            isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            `group flex items-center justify-between px-4 py-2.5 text-sm w-full
            group-hover:text-gray-500 hover:bg-gray-100 text-left`
        ) }
        value={ value }
        onClick={ () => {
            if (!isValueInArray(value, selectedItemsValues!)) {
                setSelectedItemsValues!([...selectedItemsValues!, value]);
            } else {
                setSelectedItemsValues!([...selectedItemsValues!]);
            }
        } }>
        <div className="flex items-center space-x-3 h-4">
          <input
            id="options"
            aria-describedby="options-description"
            name="options"
            type="checkbox"
            className="focus:ring-2 focus:ring-opacity-100 focus:outline-none focus:ring-blue-300 h-4 w-4
                    text-blue-500 border border-gray-300 rounded"
          />
          <span> { name } </span>
        </div>
    </button>
);

export default MultiSelectBoxItem;
