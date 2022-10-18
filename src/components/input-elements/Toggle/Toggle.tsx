import React, { useEffect, useState } from 'react';

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

export interface ToggleProps {
    defaultValue?: any,
    color?: Color,
    handleSelect?: { (value: any): void },
    children: React.ReactElement[] | React.ReactElement,
    marginTop?: MarginTop,
}

const Toggle = ({
    defaultValue,
    color = BaseColors.Blue,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleSelect = (value) => null,
    marginTop = 'mt-0',
    children,
}: ToggleProps) => {
    const [activeToggleItem, setActiveToggleItem] = useState<any|null>(defaultValue);

    useEffect(() => {
        handleSelect(activeToggleItem);
    }, [activeToggleItem]);

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
                        setActiveToggleItem: setActiveToggleItem,
                        isActive: activeToggleItem === child.props.value,
                        color: color,
                    }
                })
            )) }
        </div>
    );
};

export default Toggle;
