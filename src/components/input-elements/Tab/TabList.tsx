import React from 'react';

import { BaseColorContext, SelectedValueContext } from 'contexts';

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
import { useInternalState } from 'lib/hooks';

export interface TabListProps<T> {
    defaultValue?: T,
    value?: T,
    onValueChange?: (value: T) => void,
    handleSelect?: (value: T) => void,
    color?: Color,
    marginTop?: MarginTop,
    children: React.ReactElement[] | React.ReactElement
}

const TabList = <T,>({
    defaultValue,
    value,
    onValueChange,
    handleSelect,
    color = BaseColors.Blue,
    marginTop = 'mt-0',
    children,
}: TabListProps<T>) => {
    if (handleSelect !== undefined) {
        console.warn('DeprecationWarning: The `handleSelect` property will be depracated in the next major release. \
            Please use `onValueChange` instead.');
    }

    const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);

    const handleValueChange = (value: any) => {
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
