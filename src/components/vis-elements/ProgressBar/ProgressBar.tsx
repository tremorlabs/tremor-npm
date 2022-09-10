import React from 'react';

import 'tippy.js/dist/tippy.css';
import Tooltip from '@tippyjs/react';

import {
    BaseColors,
    classNames,
    defaultColors,
    fontSize,
    fontWeight,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    sizing,
    spacing
} from 'lib';
import { Color, MarginTop } from '../../../lib';

export interface ProgressBarProps {
    percentageValue: number,
    label?: string,
    tooltip?: string,
    color?: Color,
    marginTop?: MarginTop,
}

const ProgressBar = ({
    percentageValue,
    label,
    tooltip,
    color = BaseColors.Blue,
    marginTop = 'mt-0',
}: ProgressBarProps) => {
    const primaryBgColor = getColorVariantsFromColorThemeValue(getColorTheme(color).background).bgColor;
    const secondaryBgColor = getColorVariantsFromColorThemeValue(getColorTheme(color).lightBackground).bgColor;
    return(
        <div className={
            classNames(
                'flex items-center w-full',
                marginTop,
            )
        }>
            <div className={ classNames(
                'relative flex items-center w-full rounded-lg',
                secondaryBgColor,
                sizing.xs.height,
            ) }>
                <Tooltip content={ tooltip } className={ tooltip ? '' : 'hidden' }>
                    <div 
                        className={ classNames(
                            primaryBgColor,
                            'flex-col h-full rounded-lg'
                        ) }
                        style={ {'width': `${percentageValue}%`, 'transition': 'all 2s'} }
                    />
                </Tooltip>
            </div>
            { label ? (
                <div className={ classNames(
                    'w-16 truncate text-right',
                    getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                    spacing.sm.marginLeft,
                ) }>
                    <p className={ classNames(
                        'shrink-0 whitespace-nowrap truncate',
                        fontSize.sm,
                        fontWeight.sm,
                    ) }>
                        { label }
                    </p>
                </div>
            ) : null }
        </div>
    );
};

export default ProgressBar;
