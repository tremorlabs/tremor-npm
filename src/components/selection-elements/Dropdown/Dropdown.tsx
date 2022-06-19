import React, { useEffect, useRef, useState } from 'react';

import { ChevronDownIcon } from '@heroicons/react/solid';

import { useOnClickOutside } from '@utils/utils';

export interface DropdownProps {
    placeholder?: string,
    defaultValue?: any,
    handleSelect?: { (value: any): void },
    children: React.ReactElement[],
}

const Dropwdown = ({
    placeholder = 'Select',
    defaultValue = null,
    handleSelect = (value: any) => { value; },
    children,
}: DropdownProps) => {
    const [showModal, setShowModal] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => setShowModal(false));

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

    const [selectedItem, setSelectedItem] = useState(defaultValue);

    type ShortcutMapping = {
        [shortcut: string]: any
    }
    const shortcutMapping: ShortcutMapping = {};
    const consturctShortcutMapping = () => {
        React.Children.map(children, (child) => {
            shortcutMapping[child.props.shortcut.toLowerCase()] = {
                value: child.props.value,
                name: child.props.name,
            };
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent, shortcutMapping: ShortcutMapping) => {
        const keyLower = event.key.toLocaleLowerCase();
        if (Object.keys(shortcutMapping).includes(keyLower)) {
            setSelectedItem(shortcutMapping[keyLower].value);
        }
    };

    useEffect(() => {
        consturctShortcutMapping();

        if (selectedItem) {
            if(handleSelect) {
                handleSelect(selectedItem);
            }
            setShowModal(false);
        }

        document.addEventListener('keydown', (e) => handleKeyDown(e, shortcutMapping));

        return () => {
            document.removeEventListener('keydown', (e) => handleKeyDown(e, shortcutMapping));
        };
    }, [selectedItem]);

    return(
        <>
            <button
                className="relative inline-flex rounded-md border border-gray-300 px-4 py-2 bg-white sm:text-sm
                            font-medium shadow-sm text-gray-700 hover:bg-gray-50 focus:ring-2
                            focus:ring-opacity-100 focus:outline-none focus:ring-blue-300 button-dropdown"
                onClick={ () => setShowModal(true) }
            >
                { selectedItem ? valueToNameMapping[selectedItem] : placeholder }
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                { showModal ? (
                    <div
                        ref={ ref }
                        className="absolute py-1 rounded-md shadow-lg bg-white ring-1 
                        divide-y divide-gray-100 ring-black ring-opacity-5 focus:outline-none
                        -bottom-2 left-0 translate-y-full min-w-full"
                    >
                        { React.Children.map(children, (child: React.ReactElement) => (
                            <>
                                { React.cloneElement(child, {
                                    setSelectedItem: setSelectedItem,
                                    isActive: child?.props.value === selectedItem,
                                }) }
                            </>
                        )) }
                    </div>
                ) : null }
            </button>
        </>
    );
};

export default Dropwdown;
