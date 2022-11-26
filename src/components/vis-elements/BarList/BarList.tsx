import React from 'react';

import {
    BaseColors,
    borderRadius,
    classNames,
    defaultColors,
    defaultValueFormatter,
    fontSize,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    parseMarginTop,
    sizing,
    spacing
} from 'lib';
import { Color, MarginTop, ValueFormatter } from '../../../lib';

type BarListData = {
    value: number,
    name: string,
    icon?: React.ElementType,
    href?: string;
}

const getWidthsFromValues = (dataValues: number[]) => {
    let maxValue = -Infinity;
    dataValues.forEach(value => {
        maxValue = Math.max(maxValue, value);
    });

    return dataValues.map(value => {
        if (value === 0) return 0;
        return Math.max((value / maxValue) * 100, 1);
    });
};

export interface BarListProps {
    data: BarListData[],
    valueFormatter?: ValueFormatter,
    color?: Color,
    showAnimation?: boolean,
    marginTop?: MarginTop,
}

const BarList = ({
    data = [],
    color = BaseColors.Blue,
    valueFormatter = defaultValueFormatter,
    showAnimation = true,
    marginTop = 'mt-0',
}: BarListProps) => {
    const widths = getWidthsFromValues(data.map((item) => item.value));

    const rowHeight = sizing.threeXl.height;

    return (
        <div className={ classNames(
            'tremor-base tr-flex tr-justify-between',
            parseMarginTop(marginTop),
            spacing.threeXl.spaceX,
        ) }>
            <div className="tr-relative tr-w-full">
                { data.map((item, idx) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={ item.name }
                            className={ classNames(
                                'tr-flex tr-items-center',
                                rowHeight,
                                getColorVariantsFromColorThemeValue(getColorTheme(color).lightBackground).bgColor,
                                borderRadius.sm.all,
                                idx === data.length - 1 ? spacing.none.marginBottom : spacing.sm.marginBottom,
                            ) }
                            style={ { 'width': `${widths[idx]}%`, 'transition': showAnimation ? 'all 2s' : '' } }
                        >   
                            <div className={ classNames('tr-absolute tr-max-w-full tr-flex', spacing.sm.left) }>
                                { Icon ? (
                                    <Icon className={classNames(
                                        'tr-flex-none',
                                        sizing.lg.height,
                                        sizing.lg.width,
                                        spacing.md.marginRight,
                                        getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                                    )} aria-hidden="true" />
                                ) : null }
                                { item.href ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={ classNames(
                                            'text-elem tr-whitespace-nowrap tr-truncate tr-text-blue-500',
                                            'tr-no-underline hover:tr-underline visited:tr-text-blue-500',
                                            fontSize.sm,
                                        ) }>
                                        { item.name }
                                    </a>
                                ) : (
                                    <p className={ classNames(
                                        'text-elem tr-whitespace-nowrap tr-truncate',
                                        getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                                        fontSize.sm,
                                    ) }>
                                        { item.name }
                                    </p>
                                ) }
                            </div>
                        </div>
                    );
                }) }
            </div>
            <div className="tr-text-right tr-min-w-min">
                { data.map((item, idx) => (
                    <div
                        key={ item.name }
                        className={ classNames(
                            'tr-flex tr-justify-end tr-items-center',
                            rowHeight,
                            idx === data.length - 1 ? spacing.none.marginBottom : spacing.sm.marginBottom,
                        ) }
                    >
                        <p className={ classNames(
                            'text-elem tr-whitespace-nowrap tr-truncate',
                            getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                            fontSize.sm,
                        ) }>
                            { valueFormatter(item.value) }
                        </p>
                    </div>
                )) }
            </div>
        </div>
    );
};

export default BarList;
