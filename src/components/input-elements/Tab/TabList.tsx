import React, { useState } from 'react';

import {
    BaseColors,
    border,
    classNames,
    defaultColors,
    getColorVariantsFromColorThemeValue,
    parseMarginTop,
    spacing
} from 'lib';
import { Color } from '../../../lib/inputTypes';
import TremorBaseProps from '../../../lib/TremorBaseProps';

export interface TabListProps extends TremorBaseProps {
    defaultValue?: any,
    color?: Color,
    handleSelect?: { (value: any): void },
    children: React.ReactElement[] | React.ReactElement
}

const TabList = ({
    defaultValue,
    color = BaseColors.Blue,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleSelect = (value) => null,
    marginTop = 'mt-0',
    className = '',
    children,
}: TabListProps) => {
    const [selectedTab, setSelectedTab] = useState<any|null>(defaultValue);

    const handleTabClick = (value: any) => {
        handleSelect(value);
        setSelectedTab(value);
    };

    return(
        <ol className={ classNames(
            'tremor-base list-element tr-flex tr-justify-start tr-overflow-x-clip',
            getColorVariantsFromColorThemeValue(defaultColors.lightBorder).borderColor,
            parseMarginTop(marginTop),
            spacing.twoXl.spaceX,
            border.sm.bottom,
            className,
        ) }>
            { React.Children.map(children, (child) => (
                React.cloneElement(child, {
                    privateProps: {
                        isActive: selectedTab === child.props.value,
                        handleTabClick,
                        color,
                    }
                })
            )) }
        </ol>
    );
};

export default TabList;
