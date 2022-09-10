import React from 'react';

import 'tippy.js/dist/tippy.css';
import Tooltip from '@tippyjs/react';

import {
    DeltaTypes,
    classNames,
    defaultColors,
    getColorVariantsFromColorThemeValue,
    mapInputsToDeltaType,
    sizing
} from 'lib';
import { MarginTop } from '../../../lib';
import { colors } from './styles';

const getDeltaType = (value: number) => (
    value >= 0 ? DeltaTypes.Increase : DeltaTypes.Decrease
);

export interface DeltaBarProps {
    percentageValue: number,
    isIncreasePositive?: boolean,
    tooltip?: string,
    showAnimation?: boolean
    marginTop?: MarginTop,
}

const DeltaBar = ({
    percentageValue,
    isIncreasePositive = true,
    tooltip,
    showAnimation = true,
    marginTop = 'mt-0',
}: DeltaBarProps) => {
    return(
        <div className={ classNames(marginTop) }>
            <div className={ classNames(
                'relative flex items-center w-full rounded-lg',
                getColorVariantsFromColorThemeValue(defaultColors.background).bgColor,
                sizing.xs.height,
            ) }>
                <div className="flex justify-end h-full w-1/2">
                    { percentageValue < 0 ? (
                        <Tooltip content={ tooltip } className={ tooltip ? '' : 'hidden' }>
                            <div 
                                className={ classNames(
                                    'rounded-l-full',
                                    colors[mapInputsToDeltaType(
                                        getDeltaType(percentageValue),
                                        isIncreasePositive
                                    )].bgColor,
                                ) } 
                                style={ {'width': `${Math.abs(percentageValue)}%`, 'transition': showAnimation ? 'all 2s' : '' } } 
                            />
                        </Tooltip>
                    ) : null}
                </div>
                <div className={ classNames(
                    'rounded-lg ring-2 z-10',
                    getColorVariantsFromColorThemeValue(defaultColors.darkBackground).bgColor,
                    getColorVariantsFromColorThemeValue(defaultColors.white).ringRolor,
                    sizing.md.height,
                    sizing.twoXs.width,
                ) }
                />
                <div className="flex justify-start h-full w-1/2">
                    { percentageValue >= 0 ? (
                        <Tooltip content={ tooltip } className={ tooltip ? '' : 'hidden' }>
                            <div
                                className={ classNames(
                                    'rounded-r-full',
                                    colors[mapInputsToDeltaType(
                                        getDeltaType(percentageValue),
                                        isIncreasePositive
                                    )].bgColor,
                                ) } 
                                style={ {'width': `${Math.abs(percentageValue)}%`, 'transition': showAnimation ? 'all 2s' : ''} } 
                            />
                        </Tooltip>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default DeltaBar;
