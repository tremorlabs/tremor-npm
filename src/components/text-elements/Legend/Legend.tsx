import React from 'react';

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
import { Color } from '../../../lib/inputTypes';
import TremorBaseProps from '../../../lib/TremorBaseProps';

export interface LegendItemProps {
    name: string,
    color: Color,
}

const LegendItem = ({
    name,
    color,
}: LegendItemProps) => (
    <li className={ classNames(
        'termor-elem tr-inline-flex tr-items-center tr-truncate',
        getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
        spacing.md.marginRight,
    ) }
    >
        <svg
            className={ classNames(
                'termor-elem tr-flex-none',
                getColorVariantsFromColorThemeValue(getColorTheme(color).text).textColor,
                sizing.xs.height,
                sizing.xs.width,
                spacing.xs.marginRight,
            ) }
            fill="currentColor"
            viewBox="0 0 8 8"
        >
            <circle cx={4} cy={4} r={4} />
        </svg>
        <p className={ classNames(
            'text-elem termor-elem tr-whitespace-nowrap tr-truncate',
            fontSize.sm,
            fontWeight.sm,
        ) }>
            { name }
        </p>
    </li>
);


export interface LegendProps extends TremorBaseProps {
    categories: string[],
    colors?: Color[],
}

const Legend = ({
    categories,
    colors = themeColorRange,
    marginTop = 'mt-0',
    className = '',
}: LegendProps) => {
    return(
        <div className={ classNames('tremor-base termor-elem', parseMarginTop(marginTop), className) }>
            <ol className="list-element tr-flex tr-flex-wrap tr-overflow-hidden tr-truncate">
                { categories.map((category, idx) => (
                    <LegendItem key={ `item-${idx}` } name={ category } color={ colors[idx] } />
                )) }
            </ol>
        </div>
    );
};

export default Legend;
