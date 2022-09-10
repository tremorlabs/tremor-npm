import React from 'react';

import 'tippy.js/dist/tippy.css';
import Tooltip from '@tippyjs/react';

import { BaseColors, classNames, defaultColors, getColorTheme, getColorVariantsFromColorThemeValue, sizing } from 'lib';
import { Color, MarginTop } from '../../../lib';

export interface RangeBarProps {
    percentageValue: number,
    minRangeValue: number,
    maxRangeValue: number,
    markerTooltip?: string,
    rangeTooltip?: string,
    color?: Color,
    marginTop?: MarginTop,
}

const RangeBar = ({
    percentageValue,
    minRangeValue,
    maxRangeValue,
    markerTooltip,
    rangeTooltip,
    color = BaseColors.Blue,
    marginTop = 'mt-0',
}: RangeBarProps) => {
    return(
        <div className={ classNames(
            'relative flex items-center w-full rounded-lg',
            marginTop,
            getColorVariantsFromColorThemeValue(defaultColors.lightBackground).bgColor,
            sizing.xs.height,
        ) }>
            <Tooltip content={ rangeTooltip } className={ rangeTooltip ? '' : 'hidden' }>
                <div
                    className={ classNames(
                        'absolute h-full rounded-lg',
                        getColorVariantsFromColorThemeValue(defaultColors.darkBackground).bgColor,
                    ) }
                    style={ {'left': `${minRangeValue}%`, 'width': `${maxRangeValue - minRangeValue}%`, 'transition': 'all 2s'} } 
                />
            </Tooltip>
            <Tooltip content={ markerTooltip } className={ markerTooltip ? '' : 'hidden' }>
                <div
                    className={ classNames(
                        'absolute right-1/2 -translate-x-1/2',
                        sizing.lg.width, // wide transparant wrapper for tooltip activation
                    ) }
                    style={ { 'left': `${percentageValue}%`, 'transition': 'all 2s' } }
                >
                    <div
                        className={ classNames(
                            'rounded-lg ring-2 mx-auto',
                            getColorVariantsFromColorThemeValue(getColorTheme(color).background).bgColor,
                            getColorVariantsFromColorThemeValue(defaultColors.white).ringRolor,
                            sizing.md.height,
                            sizing.twoXs.width,
                        ) }
                    />
                </div>
            </Tooltip>
        </div>
    );
};

export default RangeBar;
