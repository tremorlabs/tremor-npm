import React from 'react';

import 'tippy.js/dist/tippy.css';
import Tooltip from '@tippyjs/react';

import { Color, MarginTop } from '../../../lib';
import {
    borderRadius,
    classNames,
    defaultColors,
    fontSize,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    parseMarginTop,
    sizing,
    spacing,
    themeColorRange,
} from 'lib';

const BarLabels = ({ categoryPercentageValues }: {categoryPercentageValues: number[]}) => {
    let prefixSum = 0;
    return (
        <div className={ classNames(
            'tremor-base tr-relative tr-flex tr-w-full',
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
                        className="tr-flex tr-items-center tr-justify-end"
                        style={ { 'width': `${widthPercentage}%` } }
                    >
                        <span className={
                            classNames(idx === 0 && widthPercentage <= 10 ? 'tr-hidden sm:tr-inline-block' : '')
                        }
                        >
                            { prefixSum }
                        </span>
                    </div>
                );
            }) }
            <div className="tr-absolute -tr-left-1 tr-top-0 tr-flex tr-items-center">
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
        <div className={ classNames(parseMarginTop(marginTop)) }>
            { showLabels ? <BarLabels categoryPercentageValues={ categoryPercentageValues } /> : null }
            <div className={ classNames(
                'tr-relative tr-flex tr-items-center tr-w-full',
                sizing.xs.height,
                spacing.threeXs.spaceX,
                borderRadius.lg.all,
            ) }
            >
                {categoryPercentageValues.map((percentageValue, idx) => {
                    return(
                        <div key={ `item-${idx}` } style={ { width: `${percentageValue}%` } } className={ classNames(
                            'tr-h-full',
                            getColorVariantsFromColorThemeValue(getColorTheme(colors[idx]).background).bgColor,
                            borderRadius.md.all,
                        ) }
                        />
                    );
                })}
                { percentageValue !== undefined ? (
                    <Tooltip content={ tooltip } className={ tooltip ? '' : 'tr-hidden' }>
                        <div
                            className={ classNames(
                                'tr-absolute tr-right-1/2 -tr-translate-x-1/2',
                                sizing.lg.width, // wide transparant wrapper for tooltip activation
                            ) }
                            style={ { 'left': `${percentageValue}%`, 'transition': showAnimation ? 'all 2s' : '' } }
                        >
                            <div
                                className={ classNames(
                                    'tr-ring-2 tr-mx-auto',
                                    markerBgColor,
                                    getColorVariantsFromColorThemeValue(defaultColors.white).ringRolor,
                                    sizing.md.height,
                                    sizing.twoXs.width,
                                    borderRadius.lg.all,
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
