import React from 'react';

import 'tippy.js/dist/tippy.css';
import Tooltip from '@tippyjs/react';

import {
    BaseColors,
    borderRadius,
    classNames,
    defaultColors,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    parseMarginTop,
    sizing
} from 'lib';
import { Color, MarginTop } from '../../../lib';

export interface RangeBarProps {
    percentageValue: number,
    minPercentageValue: number,
    maxPercentageValue: number,
    markerTooltip?: string,
    rangeTooltip?: string,
    showAnimation?: boolean,
    color?: Color,
    marginTop?: MarginTop,
}

const RangeBar = ({
    percentageValue,
    minPercentageValue,
    maxPercentageValue,
    markerTooltip,
    rangeTooltip,
    showAnimation = true,
    color = BaseColors.Blue,
    marginTop = 'mt-0',
}: RangeBarProps) => {
    return(
        <div className={ classNames(
            'tremor-base tr-relative tr-flex tr-items-center tr-w-full',
            parseMarginTop(marginTop),
            getColorVariantsFromColorThemeValue(defaultColors.lightBackground).bgColor,
            sizing.xs.height,
            borderRadius.lg.all,
        ) }>
            <Tooltip content={ rangeTooltip } className={ rangeTooltip ? '' : 'tr-hidden' }>
                <div
                    className={ classNames(
                        'tr-absolute tr-h-full',
                        getColorVariantsFromColorThemeValue(defaultColors.darkBackground).bgColor,
                        borderRadius.lg.all,
                    ) }
                    style={ {
                        'left': `${minPercentageValue}%`,
                        'width': `${maxPercentageValue - minPercentageValue}%`,
                        'transition': showAnimation ? 'all 2s' : ''
                    } }
                />
            </Tooltip>
            <Tooltip content={ markerTooltip } className={ markerTooltip ? '' : 'tr-hidden' }>
                <div
                    className={ classNames(
                        'tr-absolute tr-right-1/2 -tr-translate-x-1/2',
                        sizing.lg.width, // wide transparent wrapper for tooltip activation
                    ) }
                    style={ { 'left': `${percentageValue}%`, 'transition': showAnimation ? 'all 2s' : '' } }
                >
                    <div
                        className={ classNames(
                            'tr-ring-2 tr-mx-auto',
                            getColorVariantsFromColorThemeValue(getColorTheme(color).background).bgColor,
                            getColorVariantsFromColorThemeValue(defaultColors.white).ringColor,
                            sizing.md.height,
                            sizing.twoXs.width,
                            borderRadius.lg.all,
                        ) }
                    />
                </div>
            </Tooltip>
        </div>
    );
};

export default RangeBar;
