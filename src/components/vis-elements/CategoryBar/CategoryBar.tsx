import React from 'react';

import 'tippy.js/dist/tippy.css';
import Tooltip from '@tippyjs/react';

import { Color, MarginTop } from '../../../lib';
import { 
    classNames,
    defaultColors,
    fontSize,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    sizing,
    spacing,
    themeColorRange,
} from 'lib';

const BarLabels = ({ categoryPercentageValues }: {categoryPercentageValues: number[]}) => {
    let prefixSum = 0;
    return (
        <div className={ classNames(
            'relative flex w-full',
            getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
            spacing.twoXs.spaceX,
            spacing.sm.marginBottom,
            fontSize.sm,
        ) }
        >
            { categoryPercentageValues.slice(0, categoryPercentageValues.length).map((widthPercentage, idx) => {
                prefixSum += widthPercentage;
                return (
                    <div
                        key={ `item-${idx}` }
                        className="flex items-center justify-end"
                        style={ { 'width': `${widthPercentage}%` } }
                    >
                        <span className={
                            classNames(idx === 0 && widthPercentage <= 10 ? 'hidden sm:inline-block' : '')
                        }
                        >
                            { prefixSum }
                        </span>
                    </div>
                );
            }) }
            <div className="absolute -left-1 top-0 flex items-center">
                0
            </div>
        </div>
    );
};

export interface CategoryBarProps {
    categoryPercentageValues: number[],
    colors?: Color[],
    percentageValue?: number,
    showLabels?: boolean,
    tooltip?: string,
    showAnimation?: boolean,
    marginTop?: MarginTop,
}

const CategoryBar = ({
    categoryPercentageValues = [],
    colors = themeColorRange,
    percentageValue,
    showLabels = true,
    tooltip,
    showAnimation = true,
    marginTop = 'mt-0',
}: CategoryBarProps) => {

    const getMarkerBgColor = (): string => {
        if (percentageValue === undefined)
            return '';

        let prefixSum = 0;
        for (let i = 0; i < categoryPercentageValues.length; i++) {
            const currentWidthPercentage = categoryPercentageValues[i];
            const currentBgColor = getColorVariantsFromColorThemeValue(getColorTheme(colors[i]).background).bgColor;

            prefixSum += currentWidthPercentage;
            if (prefixSum >= percentageValue)
                return currentBgColor;
        }

        return '';
    };

    const markerBgColor = getMarkerBgColor();

    return(
        <div className={ classNames(marginTop) }>
            { showLabels ? <BarLabels categoryPercentageValues={ categoryPercentageValues } /> : null }
            <div className={ classNames(
                'relative flex items-center w-full rounded-lg',
                sizing.xs.height,
                spacing.threeXs.spaceX,
            ) }
            >
                {categoryPercentageValues.map((percentageValue, idx) => {
                    return(
                        <div key={ `item-${idx}` } style={ { width: `${percentageValue}%` } } className={ classNames(
                            'h-full rounded-md',
                            getColorVariantsFromColorThemeValue(getColorTheme(colors[idx]).background).bgColor,
                        ) }
                        />
                    );
                })}
                { percentageValue !== undefined ? (
                    <Tooltip content={ tooltip } className={ tooltip ? '' : 'hidden' }>
                        <div
                            className={ classNames(
                                'absolute right-1/2 -translate-x-1/2',
                                sizing.lg.width, // wide transparant wrapper for tooltip activation
                            ) }
                            style={ { 'left': `${percentageValue}%`, 'transition': showAnimation ? 'all 2s' : '' } }
                        >
                            <div
                                className={ classNames(
                                    'rounded-lg ring-2 mx-auto',
                                    markerBgColor,
                                    getColorVariantsFromColorThemeValue(defaultColors.white).ringRolor,
                                    sizing.md.height,
                                    sizing.twoXs.width,
                                ) }
                            />
                        </div>
                    </Tooltip>
                ) : null}
            </div>
        </div>
    );
};

export default CategoryBar;
