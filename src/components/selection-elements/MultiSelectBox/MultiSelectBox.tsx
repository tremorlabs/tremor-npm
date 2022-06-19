import React, { useEffect, useRef, useState } from 'react';

import { ChevronDownIcon, XCircleIcon, XIcon } from '@heroicons/react/solid';
import { SearchIcon  } from '@heroicons/react/solid';

import { removeValueFromArray, useOnClickOutside } from '@utils/utils';

interface SelectedItemBadgeProps {
    name: string,
    value: number,
    selectedItemsValues: any[],
    setSelectedItemsValues: React.Dispatch<React.SetStateAction<any[]>>,
}

const SelectedItemBadge = ({
    name,
    value,
    selectedItemsValues,
    setSelectedItemsValues,
}: SelectedItemBadgeProps) => (
    <span className="inline-flex rounded items-center py-0.5 pl-2 pr-1 sm:text-sm bg-blue-100 text-blue-500
                    whitespace-nowrap">
        { name }
        <div className="flex-shrink-0 ml-2 inline-flex items-center justify-center text-blue-500">
            <button onClick={ () => { setSelectedItemsValues(removeValueFromArray(value, selectedItemsValues)); }}>
                <XIcon className="p-0.5 h-5 w-5 text-blue-500 hover:text-blue-600 hover:rounded-full hover:bg-blue-200" 
                aria-hidden="true" />
            </button>
        </div>
    </span>
);

export interface MultiSelectBoxProps {
    defaultValues?: any[],
    handleSelect?: { (value: any): void },
    placeholder?: string,
    children: React.ReactElement[],
}

const MultiSelectBox = ({
    defaultValues = [],
    handleSelect = (value) => null,
    placeholder = 'Select options',
    children,
}: MultiSelectBoxProps) => {
    const [showModal, setShowModal] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => setShowModal(false));
    
    const [selectedItemsValues, setSelectedItemsValues] = useState(defaultValues);

    type ValueToNameMapping = {
        [value: string]: string
    }
    const valueToNameMapping: ValueToNameMapping = {};
    const consturctValueToNameMapping = () => {
        React.Children.map(children, (child) => {
            valueToNameMapping[child.props.value] = child.props.name;
        });
    };
    consturctValueToNameMapping();

    useEffect(() => {
        if (selectedItemsValues) {
            if(handleSelect) handleSelect(selectedItemsValues);
            setShowModal(false);
        }
    }, [selectedItemsValues]);

    return (
        <>
            <button
                // -----------------------------------------------------
                // pl-2 instead of pl-4 if at least one option is selected
                // py-1.5 instead of py-2 if at least one option is selected
                // -----------------------------------------------------

                className="relative max-w-md flex items-center justify-between shadow-sm rounded-md border border-gray-300 pl-4
                    pr-2 py-2 bg-white sm:text-sm font-medium text-gray-500 hover:bg-gray-50 focus:ring-2
                    focus:ring-opacity-100 focus:outline-none focus:ring-blue-300"
                onClick={ () => {setShowModal(true); console.log('clicked');} }
            >
                {/* -----------------------------------------------------
                // pr-6 is dropped if at least one option is selected
                ----------------------------------------------------- */}

                <div className="flex items-center space-x-1 pr-6">
                    {
                        selectedItemsValues.length !== 0 ? selectedItemsValues.map((itemValue) => (
                            <SelectedItemBadge
                                name={ valueToNameMapping[itemValue] }
                                value={ itemValue }
                                selectedItemsValues={ selectedItemsValues }
                                setSelectedItemsValues={ setSelectedItemsValues }
                            />
                        )) : <>{ placeholder }</>
                    }
                </div>
                <div className="flex items-center ml-2 space-x-0.5">
                    <span className="sr-only">Remove all selected options</span>
                    <button onClick={ () => setSelectedItemsValues([]) }>
                        <XCircleIcon className="h-5 w-5 text-gray-300 hover:text-gray-400 flex-none" aria-hidden="true" />
                    </button>
                        <ChevronDownIcon className="h-5 w-5 text-gray-400 hover:text-gray-500 flex-none" aria-hidden="true" />
                </div>
                { showModal ? (
                    <div
                        ref={ ref }
                        className="absolute sm:text-sm rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y
                            divide-gray-100 focus:outline-none left-0 -bottom-2 translate-y-full min-w-full max-w-sm max-h-72 overflow-auto"
                    >
                        <div className="relative w-full rounded-t-md bg-gray-50">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-gray-400 flex-none" aria-hidden="true" />
                            </div>
                            <input
                                id="search"
                                aria-describedby="search-bar"
                                name="search"
                                type="email"
                                placeholder='Search'
                                className="pl-11 blockfocus:ring-2 focus:ring-opacity-100 focus:rounded-t-lg focus:outline-none
                                focus:ring-transparent focus:border-transparent border-transparent bg-transparent w-full"
                            />
                        </div>
                        <div className="pt-1 pb-2">
                        { React.Children.map(children, (child) => (
                            <>
                                { React.cloneElement(child, {
                                    selectedItemsValues: selectedItemsValues,
                                    setSelectedItemsValues: setSelectedItemsValues,
                                }) }
                            </>
                        )) }
                        </div>
                    </div>
                ) : null }
            </button>
        </>
    );
};

export default MultiSelectBox;
