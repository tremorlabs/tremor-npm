import React from 'react';

import { BaseColorContext, SelectedValueContext } from 'contexts';

import { useInternalState } from 'hooks';

import {
    BaseColors,
    border,
    classNames,
    defaultColors,
    getColorVariantsFromColorThemeValue,
    parseMarginTop,
    spacing
} from 'lib';
import { Color, MarginTop } from '../../../lib';

export interface TabListProps<T> {
    defaultValue?: T,
    value?: T,
    onValueChange?: (value: T) => void,
    handleSelect?: (value: any) => void, // Deprecated
    color?: Color,
    marginTop?: MarginTop,
    children: React.ReactElement[] | React.ReactElement
}

const TabList = <T,>({
    defaultValue,
    value,
    onValueChange,
    handleSelect, // Deprecated
    color = BaseColors.Blue,
    marginTop = 'mt-0',
    children,
}: TabListProps<T>) => {
    if (handleSelect !== undefined) {
        console.warn('DeprecationWarning: The `handleSelect` property is deprecated and will be removed \
            in the next major release. Please use `onValueChange` instead.');
    }

    const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);

    const handleValueChange = (value: T) => {
        onValueChange?.(value);
        handleSelect?.(value);
        setSelectedValue(value);
    };

    return(
        <ol aria-label="Tabs" className={ classNames(
            'tremor-base list-element tr-flex tr-justify-start tr-overflow-x-clip',
            getColorVariantsFromColorThemeValue(defaultColors.lightBorder).borderColor,
            parseMarginTop(marginTop),
            spacing.twoXl.spaceX,
            border.sm.bottom,
        ) }>
            <SelectedValueContext.Provider value={ { selectedValue, handleValueChange } }>
                <BaseColorContext.Provider value={ color }>
                    { React.Children.map(children, (child) => React.cloneElement(child)) }
                </BaseColorContext.Provider>
            </SelectedValueContext.Provider>
        </ol>
    );
};

export default TabList;
