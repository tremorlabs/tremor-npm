import React from 'react';

import { Color, MarginTop, Size } from '../../../lib';
import {
    classNames,
    defaultColors,
    fontSize,
    fontWeight,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    parseMarginTop,
    sizing,
    spacing,
    themeColorRange
} from 'lib';

export interface LegendItemProps {
    name: string,
    color: Color,
    labelSize: Size,
    roundSize: Size,
}

const LegendItem = ({
    name,
    color,
    labelSize,
    roundSize,
}: LegendItemProps) => (
    <li className={ classNames(
        'tr-inline-flex tr-items-center tr-truncate',
        getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
        spacing.md.marginRight,
    ) }
    >
        <svg
            className={ classNames(
                'tr-flex-none',
                getColorVariantsFromColorThemeValue(getColorTheme(color).text).textColor,
                sizing[roundSize].height,
                sizing[roundSize].width,
                spacing[roundSize].marginRight,
            ) }
            fill="currentColor"
            viewBox="0 0 8 8"
        >
            <circle cx={4} cy={4} r={4} />
        </svg>
        <p className={ classNames(
            'tr-whitespace-nowrap tr-truncate',
            fontSize[labelSize],
            fontWeight.sm,
        ) }>
            { name }
        </p>
    </li>
);


export interface LegendProps {
    categories: string[],
    colors?: Color[],
    marginTop?: MarginTop,
    labelSize?: Size,
    roundSize?: Size,
}

const Legend = ({
    categories,
    colors = themeColorRange,
    marginTop = 'mt-0',
    labelSize = 'sm',
    roundSize = 'xs',
}: LegendProps) => {
    return(
        <div className={ classNames(parseMarginTop(marginTop)) }>
            <ol className="tr-flex tr-flex-wrap tr-overflow-hidden tr-truncate">
                { categories.map((category, idx) => (
                    <LegendItem
                        key={ `item-${idx}` }
                        name={ category }
                        color={ colors[idx] }
                        labelSize={labelSize}
                        roundSize={roundSize}
                    />
                )) }
            </ol>
        </div>
    );
};

export default Legend;
