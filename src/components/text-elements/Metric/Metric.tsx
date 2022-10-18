import React from 'react';

import {
    BaseColors,
    classNames,
    fontSize,
    fontWeight,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    parseMarginTop,
    parseTruncateOption,
} from 'lib';
import { Color, MarginTop } from '../../../lib';

export interface MetricProps {
    color?: Color,
    truncate?: boolean,
    marginTop?: MarginTop,
    children: React.ReactNode,
}

const Metric = ({
    color = BaseColors.Gray,
    truncate = false,
    marginTop = 'mt-0',
    children,
}: MetricProps) => {
    return(
        <div className={ classNames('tremor-base', parseMarginTop(marginTop)) }>
            <p className={ classNames(
                'text-elem',
                truncate ? 'tr-whitespace-nowrap' : 'tr-shrink-0',
                parseTruncateOption(truncate),
                getColorVariantsFromColorThemeValue(getColorTheme(color).darkText).textColor,
                fontSize.threeXl,
                fontWeight.lg,
            ) }
            >
                { children }
            </p>
        </div>
    );
};

export default Metric;
