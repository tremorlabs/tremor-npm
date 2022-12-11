import React, { useState } from 'react';

import {
    Bar,
    CartesianGrid,
    Legend,
    BarChart as ReChartsBarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { constructCategoryColors, getYAxisDomain } from '../common/utils';
import BaseChartProps from '../common/BaseChartProps';
import ChartLegend from '../common/ChartLegend';
import ChartTooltip from '../common/ChartTooltip';

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
import { AxisDomain } from 'recharts/types/util/types';

export interface BarChartProps extends BaseChartProps {
    layout?: 'vertical' | 'horizontal',
    stack?: boolean,
    relative?: boolean,
}

const BarChart = ({
    data = [],
    categories = [],
    dataKey,
    colors = themeColorRange,
    valueFormatter = defaultValueFormatter,
    layout = 'horizontal',
    stack = false,
    relative = false,
    startEndOnly = false,
    showAnimation = true,
    showXAxis = true,
    showYAxis = true,
    yAxisWidth = 'w-14',
    showTooltip = true,
    showLegend = true,
    showGridLines = true,
    height = 'h-80',
    marginTop = 'mt-0',
    autoMinValue = false,
    minValue,
    maxValue,
}: BarChartProps) => {
    const [legendHeight, setLegendHeight] = useState(60);
    const categoryColors = constructCategoryColors(categories, colors);

    const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);

    return (
        <div className={ classNames(
            'tremor-base tr-w-full',
            parseHeight(height),
            parseMarginTop(marginTop)
        ) }
        >
            <ResponsiveContainer width="100%" height="100%">
                <ReChartsBarChart
                    data={ data }
                    stackOffset={ relative ? 'expand' : 'none' }
                    layout={ layout === 'vertical' ? 'vertical' : 'horizontal' }
                >
                    { showGridLines ? (
                        <CartesianGrid
                            strokeDasharray="3 3"
                            horizontal={ layout !== 'vertical' ? true : false }
                            vertical={ layout !== 'vertical' ? false : true }
                        />
                    ) : null }

                    { layout !== 'vertical' ? (
                        <XAxis
                            hide={ !showXAxis }
                            dataKey={ dataKey }
                            interval="preserveStartEnd"
                            tick={{ transform: 'translate(0, 6)' }} //padding between labels and axis
                            ticks={ startEndOnly ? [data[0][dataKey], data[data.length - 1][dataKey]] : undefined }
                            style={{
                                fontSize: '12px',
                                fontFamily: 'Inter; Helvetica',
                                marginTop: '20px',
                            }}
                            tickLine={false}
                            axisLine={false}
                        />
                    ) : (
                        <XAxis
                            hide={ !showXAxis }
                            type="number"
                            tick={ { transform: 'translate(-3, 0)' } }
                            domain={ yAxisDomain as AxisDomain }
                            style={{
                                fontSize: '12px',
                                fontFamily: 'Inter; Helvetica',
                            }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={ valueFormatter }
                            padding={{ left: 10, right: 10 }}
                            minTickGap={5}
                        />
                    )}
                    { layout !== 'vertical' ? (
                        <YAxis
                            width={ getPixelsFromTwClassName(yAxisWidth) }
                            hide={ !showYAxis }
                            axisLine={ false }
                            tickLine={ false }
                            type="number"
                            domain={ yAxisDomain as AxisDomain }
                            tick={ { transform: 'translate(-3, 0)' } }
                            style={ {
                                fontSize: '12px',
                                fontFamily: 'Inter; Helvetica',
                            } }
                            tickFormatter={
                                relative
                                    ? (value: number) => `${(value * 100).toString()} %`
                                    : valueFormatter
                            }
                        />
                    ) : (
                        <YAxis
                            width={ getPixelsFromTwClassName(yAxisWidth) }
                            hide={ !showYAxis }
                            dataKey={ dataKey }
                            axisLine={ false }
                            tickLine={ false }
                            ticks={ startEndOnly ? [data[0][dataKey], data[data.length - 1][dataKey]] : undefined }
                            type="category"
                            interval="preserveStartEnd"
                            tick={ { transform: 'translate(0, 6)' } }
                            style={ {
                                fontSize: '12px',
                                fontFamily: 'Inter; Helvetica',
                            } }  
                        />
                    ) }
                    { showTooltip ? (
                        <Tooltip
                            // ongoing issue: https://github.com/recharts/recharts/issues/2920
                            wrapperStyle={{ outline: 'none' }}
                            isAnimationActive={false}
                            cursor={ { fill: '#d1d5db', opacity: '0.15' } }
                            content={ ({ active, payload, label }) => (
                                <ChartTooltip
                                    active={ active }
                                    payload={ payload }
                                    label={ label }
                                    valueFormatter={ valueFormatter }
                                    categoryColors={ categoryColors }
                                />
                            ) }
                            position={{ y: 0 }}
                        />
                    ) : null }
                    {
                        showLegend ? (
                            <Legend
                                verticalAlign="top"
                                height={ legendHeight }
                                content={ ({ payload }) => ChartLegend({ payload }, categoryColors, setLegendHeight) }
                            />
                        ) : null
                    }
                    {
                        categories.map((category) => (
                            <Bar
                                key={ category }
                                name={ category }
                                type="linear"
                                stackId={ stack || relative ? 'a' : undefined }
                                dataKey={ category }
                                fill={ getHexFromColorThemeValue(getColorTheme(
                                    categoryColors.get(category)
                                ).background) }
                                isAnimationActive={ showAnimation }
                            />

                        ))
                    }
                </ReChartsBarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChart;
