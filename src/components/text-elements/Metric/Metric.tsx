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
import { Color } from '../../../lib';
import TremorBaseProps from '../../../lib/TremorBaseProps';

export interface MetricProps extends TremorBaseProps {
    color?: Color,
    truncate?: boolean,
    children: React.ReactNode,
}

const Metric = ({
    color = BaseColors.Gray,
    truncate = false,
    marginTop = 'mt-0',
    className = '',
    children,
}: MetricProps) => {
    return(
        <p className={ classNames(
            'tremor-base text-elem',
            truncate ? 'tr-whitespace-nowrap' : 'tr-shrink-0',
            parseTruncateOption(truncate),
            getColorVariantsFromColorThemeValue(getColorTheme(color).darkText).textColor,
            fontSize.threeXl,
            fontWeight.lg,
            parseMarginTop(marginTop),
            className,
        ) }
        >
            { children }
        </p>
    );
};

export default Metric;
