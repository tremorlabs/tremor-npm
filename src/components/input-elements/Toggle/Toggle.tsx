import React, { useState } from 'react';

import {
    BaseColors,
    borderRadius,
    classNames,
    defaultColors,
    getColorVariantsFromColorThemeValue,
    parseMarginTop,
    spacing
} from 'lib';
import { Color } from '../../../lib';
import TremorBaseProps from '../../../lib/TremorBaseProps';

export interface ToggleProps extends TremorBaseProps {
    defaultValue?: any,
    color?: Color,
    handleSelect?: { (value: any): void },
    children: React.ReactElement[] | React.ReactElement,
}

const Toggle = ({
    defaultValue,
    color = BaseColors.Blue,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleSelect = (value) => null,
    marginTop = 'mt-0',
    className = '',
    children,
}: ToggleProps) => {
    const [activeToggleItem, setActiveToggleItem] = useState<any|null>(defaultValue);

    const handleToggleItemClick = (value: any) => {
        handleSelect(value);
        setActiveToggleItem(value);
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
            borderRadius.lg.all,
            className
        ) }
        >
            { React.Children.map(children, (child) => (
                React.cloneElement(child, {
                    privateProps: {
                        isActive: activeToggleItem === child.props.value,
                        handleToggleItemClick,
                        color,
                    }
                })
            )) }
        </div>
    );
};

export default Toggle;
