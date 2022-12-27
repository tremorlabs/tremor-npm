import React from 'react';

import {
    BaseColors,
    borderRadius,
    classNames,
    defaultColors,
    getColorVariantsFromColorThemeValue,
    parseMarginTop,
    spacing
} from 'lib';
import { Color, MarginTop } from '../../../lib';
import { useInternalState } from 'lib/hooks';

export interface ToggleProps<T> {
    defaultValue?: T,
    value?: T,
    onValueChange?: (value: T) => void,
    handleSelect?: (value: T) => void,
    color?: Color,
    marginTop?: MarginTop,
    children: React.ReactElement[] | React.ReactElement,
}

const Toggle = <T, >({
    defaultValue,
    value,
    onValueChange,
    handleSelect,
    color = BaseColors.Blue,
    marginTop = 'mt-0',
    children,
}: ToggleProps<T>) => {
    const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);

    const handleValueChange = (value: any) => {
        onValueChange?.(value);
        handleSelect?.(value);
        setSelectedValue(value);
    };

    return (
        <div className={ classNames(
            'tremor-base tr-flex-nowrap tr-inline-flex tr-justify-start',
            getColorVariantsFromColorThemeValue(defaultColors.lightBackground).bgColor,
            parseMarginTop(marginTop),
            spacing.twoXs.paddingLeft,
            spacing.twoXs.paddingRight,
            spacing.twoXs.paddingTop,
            spacing.twoXs.paddingBottom,
            borderRadius.lg.all
        ) }
        >
            { React.Children.map(children, (child) => (
                React.cloneElement(child, {
                    privateProps: {
                        isActive: selectedValue === child.props.value,
                        handleValueChange,
                        color,
                    }
                })
            )) }
        </div>
    );
};

export default Toggle;
