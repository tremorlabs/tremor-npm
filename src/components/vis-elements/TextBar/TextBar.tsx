import React from 'react';

import {
    BaseColors,
    classNames,
    defaultColors,
    defaultValueFormater,
    fontSize,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    sizing,
    spacing
} from 'lib';
import { Color, MarginTop, ValueFormater } from '../../../lib';

type TextBarData = {
    name: string,
    value: number,
}

const getWidthsFromValues = (data: TextBarData[]) => {
    let maxValue = -Infinity;
    data.forEach(item => {
        maxValue = Math.max(maxValue, item.value);
    });

    return data.map(item => {
        if (item.value === 0) return 0;
        return Math.max((item.value / maxValue) * 100, 1);
    });
};

export interface TextBarProps {
    data: TextBarData[],
    valueFormater?: ValueFormater,
    color?: Color,
    showAnimation?: boolean,
    marginTop?: MarginTop,
}

const TextBar = ({
    data = [],
    color = BaseColors.Blue,
    valueFormater = defaultValueFormater,
    showAnimation = true,
    marginTop = 'mt-0',
}: TextBarProps) => {
    const widths = getWidthsFromValues(data);

    const rowHeight = sizing.threeXl.height;

    return (
        <div className={ classNames(
            'flex justify-between',
            marginTop,
            spacing.threeXl.spaceX,
        ) }>
            <div className="relative w-full">
                { data.map((item, idx) => (
                    <div
                        key={ item.value }
                        className={ classNames(
                            'flex items-center rounded-sm',
                            rowHeight,
                            getColorVariantsFromColorThemeValue(getColorTheme(color).lightBackground).bgColor,
                            idx === data.length - 1 ? spacing.none.marginBottom : spacing.sm.marginBottom,
                        ) }
                        style={ { 'width': `${widths[idx]}%`, 'transition': showAnimation ? 'all 2s' : '' } }
                    >
                        <p className={ classNames(
                            'absolute max-w-full whitespace-nowrap truncate',
                            getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                            spacing.sm.left,
                            fontSize.sm,
                        ) }>
                            { item.name }
                        </p>
                    </div>
                )) }
            </div>
            <div className="text-right min-w-min">
                { data.map((item, idx) => (
                    <div
                        key={ item.value }
                        className={ classNames(
                            'flex justify-end items-center',
                            rowHeight,
                            idx === data.length - 1 ? spacing.none.marginBottom : spacing.sm.marginBottom,
                        ) }
                    >
                        <p className={ classNames(
                            'whitespace-nowrap truncate',
                            getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                            fontSize.sm,
                        ) }>
                            { valueFormater(item.value) }
                        </p>
                    </div>
                )) }
            </div>
        </div>
    );
};

export default TextBar;
