import React from 'react';

import { Color, ValueFormatter } from '../../../lib';
import {
    border,
    borderRadius,
    boxShadow,
    classNames,
    defaultColors,
    fontSize,
    fontWeight,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    sizing,
    spacing,
} from 'lib';

export interface ChartTooltipRowProps {
    value: string,
    name: string,
    color: Color | null | undefined,
}

const ChartTooltipRow = ({ value, name, color }: ChartTooltipRowProps) => (
    <div className="tr-flex tr-items-center tr-justify-between tr-space-x-8">
        <div className="tr-flex tr-items-center tr-space-x-2">
            <span className={ classNames(
                'tr-shrink-0',
                getColorVariantsFromColorThemeValue(getColorTheme(color).background).bgColor,
                getColorVariantsFromColorThemeValue(defaultColors.white).borderColor,
                sizing.sm.height,
                sizing.sm.width,
                borderRadius.full.all,
                border.md.all,
                boxShadow.md,
            ) } />
            <p className={ classNames(
                'text-elem tr-font-medium tr-tabular-nums tr-text-right tr-whitespace-nowrap',
                getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
            ) }>
                { value }
            </p>
        </div>
        <p className={ classNames(
            'text-elem tr-text-right tr-whitespace-nowrap',
            getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
            fontWeight.sm,
        ) }>
            { name }
        </p>
    </div>
);

export interface ChartTooltipProps {
    active: boolean | undefined,
    payload: any,
    label: string,
    categoryColors: Map<string, Color>,
    valueFormatter: ValueFormatter,
}

const ChartTooltip = ({
    active,
    payload,
    label,
    categoryColors,
    valueFormatter,
}: ChartTooltipProps) => {
    if (active && payload) {
        return (
            <div className={ classNames(
                getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
                fontSize.sm,
                borderRadius.md.all,
                border.sm.all,
                boxShadow.lg,
            ) }>
                <div className={ classNames(
                    getColorVariantsFromColorThemeValue(defaultColors.lightBorder).borderColor,
                    spacing.twoXl.paddingLeft,
                    spacing.twoXl.paddingRight,
                    spacing.sm.paddingTop,
                    spacing.sm.paddingBottom,
                    border.sm.bottom,
                ) }>
                    <p className={ classNames(
                        'text-elem',
                        getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                        fontWeight.md,
                    ) }>
                        { label }
                    </p>
                </div>
  
                <div className={ classNames(
                    spacing.twoXl.paddingLeft,
                    spacing.twoXl.paddingRight,
                    spacing.sm.paddingTop,
                    spacing.sm.paddingBottom,
                    'tr-space-y-1',
                ) }>
                    {
                        payload.map(({value, name}: { value: number, name: string }, idx: number) => (
                            <ChartTooltipRow
                                key={ `id-${idx}` }
                                value={ valueFormatter(value) }
                                name={ name }
                                color={ categoryColors.get(name) }
                            />
                        ))
                    }
                </div>
            </div>
        );
    }
  
    return null;
};

export default ChartTooltip;
