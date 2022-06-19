import React, { useEffect, useState } from 'react';

import BaseComponentProps from '@common/BaseComponentInterface';

import { classNames, parseBorderClassNames, parseMarginTopClassNames } from '@utils/classname-utils';

export interface TabListProps extends BaseComponentProps {
    defaultValue?: any,
    borderColor?: string,
    handleSelect?: { (value: any): void },
    children: React.ReactElement[]
}

const TabList = ({
    defaultValue,
    borderColor = 'border-gray-200',
    marginTop,
    handleSelect = (value) => null,
    children,
}: TabListProps) => {
    const [selectedTab, setSelectedTab] = useState<any|null>(defaultValue);

    useEffect(() => {
        handleSelect(selectedTab);
    }, [selectedTab]);

    return(
        <>
        <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
            Select a tab
            </label>
            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
            <select
            id="tabs"
            name="tabs" 
            className="block w-full focus:border-transparent focus:ring-2
                     focus:ring-opacity-100 focus:outline-none focus:ring-blue-300 border-gray-300 rounded-md"
                // defaultValue={tabs.find((tab) => tab.current).name}
            >
            { React.Children.map(children, (child) => (
                <>
                    { React.cloneElement(child, {
                        setSelectedTab: setSelectedTab,
                        isActive: selectedTab === child.props.value,
                    }) }
                </>
            )) }
            </select>
        </div>
        <div className="hidden sm:block">
            <ol aria-label="Tabs" className={ classNames(
                parseBorderClassNames(borderColor),
                parseMarginTopClassNames(marginTop),
                'border-b sm:flex justify-start space-x-4'
            ) }>
                { React.Children.map(children, (child) => (
                    <>
                        { React.cloneElement(child, {
                            setSelectedTab: setSelectedTab,
                            isActive: selectedTab === child.props.value,
                        }) }
                    </>
                )) }
            </ol>
        </div>
        </>
    );
};

export default TabList;
