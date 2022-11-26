import React, { useState } from 'react';

import {
    Area,
    CartesianGrid,
    Legend,
    AreaChart as ReChartsAreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import BaseChartProps from '../common/BaseChartProps';
import ChartLegend from '../common/ChartLegend';
import ChartTooltip from '../common/ChartTooltip';
import { constructCategoryColors } from '../common/constructCategoryColors';

import {
    classNames,
    defaultValueFormatter,
    getColorTheme,
    getHexFromColorThemeValue,
    getPixelsFromTwClassName,
    parseHeight,
    parseMarginTop,
    themeColorRange
} from 'lib';

export interface AreaChartProps extends BaseChartProps {
    stack?: boolean,
}

const AreaChart = ({
    data = [],
    categories = [],
    dataKey,
    stack = false,
    autoMinValue = false,
    colors = themeColorRange,
    valueFormatter = defaultValueFormatter,
    startEndOnly = false,
    showXAxis = true,
    showYAxis = true,
    yAxisWidth = 'w-14',
    showAnimation = true,
    showTooltip = true,
    showLegend = true,
    showGridLines = true,
    showGradient = true,
    height = 'h-80',
    marginTop = 'mt-0',
}: AreaChartProps) => {
    const [legendHeight, setLegendHeight] = useState(60);
    const categoryColors = constructCategoryColors(categories, colors);

    return (
        <div
            className={ classNames(
                'tremor-base tr-w-full',
                parseHeight(height), parseMarginTop(marginTop)
            ) }
        >
            <ResponsiveContainer width="100%" height="100%">
                <ReChartsAreaChart data={ data }>
                    { showGridLines ? (
                        <CartesianGrid
                            strokeDasharray="3 3"
                            horizontal={ true }
                            vertical={ false }
                        />
                    ) : null }
                    <XAxis
                        hide={ !showXAxis }
                        dataKey={ dataKey }
                        tick={ { transform: 'translate(0, 6)' } } 
                        ticks={ startEndOnly ? [data[0][dataKey], data[data.length - 1][dataKey]] : undefined }
                        style={ {
                            fontSize: '12px',
                            fontFamily: 'Inter; Helvetica',
                        } }
                        interval="preserveStartEnd"
                        tickLine={ false }
                        axisLine={ false }
                        padding={{ left: 10, right: 10 }}
                        minTickGap={5}
                    />
                    <YAxis
                        width={ getPixelsFromTwClassName(yAxisWidth) }
                        hide={ !showYAxis }
                        axisLine={ false }
                        tickLine={ false }
                        type="number"
                        domain={ autoMinValue ? ['auto', 'auto'] : [0, 'auto']}
                        tick={ { transform: 'translate(-3, 0)' } }
                        style={ {
                            fontSize: '12px',
                            fontFamily: 'Inter; Helvetica',
                        } }
                        tickFormatter={ valueFormatter }
                    />
                    { showTooltip ? (
                        <Tooltip
                        // ongoing issue: https://github.com/recharts/recharts/issues/2920
                            wrapperStyle={{ outline: 'none' }}
                            isAnimationActive={false}
                            cursor={{ stroke: '#d1d5db', strokeWidth: 1 }}
                            content={ ({ active, payload, label }) => (
                                <ChartTooltip
                                    active={ active }
                                    payload={ payload }
                                    label={ label }
                                    valueFormatter={ valueFormatter }
                                    categoryColors={ categoryColors }
                                />
                            ) }
                            position={ { y: 0 } }
                        />
                    ) : null }
                    { showLegend ? (
                        <Legend
                            verticalAlign="top"
                            height={ legendHeight }
                            content={ ({ payload }) => ChartLegend({ payload }, categoryColors, setLegendHeight) }
                        />
                    ) : null }

                    { categories.map((category) => (
                        <defs key={ category }>
                            { showGradient ? ( 
                                <linearGradient id={ categoryColors.get(category) } x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor={ getHexFromColorThemeValue(
                                            getColorTheme(categoryColors.get(category)).background
                                        ) }
                                        stopOpacity={0.4}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={ getHexFromColorThemeValue(
                                            getColorTheme(categoryColors.get(category)).background
                                        ) }
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            ) : (
                                <linearGradient id={ categoryColors.get(category) } x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        stopColor={ getHexFromColorThemeValue(
                                            getColorTheme(categoryColors.get(category)).background
                                        ) }
                                        stopOpacity={0.3}
                                    />
                                </linearGradient>
                            )}
                        </defs>
                    )) }

                    { categories.map((category) => (
                        <Area
                            key={ category }
                            name={ category }
                            type="linear"
                            dataKey={ category }
                            stroke={ getHexFromColorThemeValue(getColorTheme(categoryColors.get(category)).background) }
                            fill={ `url(#${categoryColors.get(category)})` }
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={ showAnimation }
                            stackId={ stack ? 'a' : undefined }
                        />
                    ))}
                
                </ReChartsAreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AreaChart;
