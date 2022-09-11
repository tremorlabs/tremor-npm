import React from 'react';
import CountUp from 'react-countup';

import {
    BaseColors,
    classNames,
    fontSize,
    fontWeight,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    parseTruncateOption,
} from 'lib';
import { Color, MarginTop } from '../../../lib';

export interface MetricProps {
    color?: Color,
    truncate?: boolean,
    marginTop?: MarginTop,
    prefix?: string,
    suffix?: string,
    number: number,
    separator?: string,
    duration?: number
}

const Metric = ({
    color = BaseColors.Gray,
    truncate = false,
    marginTop = 'mt-0',
    number,
    prefix = '',
    suffix = '',
    separator = ',',
    duration = 0.5
}: MetricProps) => {
    return(
        <div className={ classNames(marginTop) }>
            <p className={ classNames(
                truncate ? 'whitespace-nowrap' : 'shrink-0',
                parseTruncateOption(truncate),
                getColorVariantsFromColorThemeValue(getColorTheme(color).darkText).textColor,
                fontSize.threeXl,
                fontWeight.lg,
            ) }
            >
                <CountUp 
                    separator={ separator }
                    prefix={ prefix }
                    end={ number }
                    suffix={ suffix }
                    duration={ duration }
                />

            </p>
        </div>
    );
};

export default Metric;
