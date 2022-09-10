import React from 'react';

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

import BaseChartProps from '../common/BaseChartProps';
import ChartLegend from '../common/ChartLegend';
import ChartTooltip from '../common/ChartTooltip';

import {
    classNames,
    defaultValueFormater,
    getColorTheme,
    getHexFromColorThemeValue,
    getPixelsFromTwClassName,
    themeColorRange
} from 'lib';

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
    valueFormater = defaultValueFormater,
    layout = 'horizontal',
    stack = false,
    relative = false,
    startEndOnly = false,
    showXAxis = true,
    showYAxis = true,
    yAxisWidth = 'w-14',
    showAnimation = true,
    showTooltip = true,
    showLegend = true,
    showGridLines = true,
    height = 'h-80',
    paddingTop = 'pt-0',
    paddingRight = 'pr-0',
    paddingBottom = 'pb-0',
    paddingLeft = 'pl-0',
    marginTop = 'mt-0',
}: BarChartProps) => (
    <div className={ classNames('w-full', height, marginTop) }>
        <ResponsiveContainer width="100%" height="100%">
            <ReChartsBarChart
                data={ data }
                stackOffset={ relative ? 'expand' : 'none' }
                layout={ layout === 'vertical' ? 'vertical' : 'horizontal' }
                margin={{
                    left: getPixelsFromTwClassName(paddingLeft),
                    top: getPixelsFromTwClassName(paddingTop),
                    right: getPixelsFromTwClassName(paddingRight),
                    bottom: getPixelsFromTwClassName(paddingBottom),
                }}
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
                        tick={ { transform: 'translate(-3, 0)' } } //padding between labels and axis
                        style={{
                            fontSize: '12px',
                            fontFamily: 'Inter; Helvetica',
                            marginTop: '20px',
                        }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={ valueFormater }
                    />
                )}
                { layout !== 'vertical' ? (
                    <YAxis
                        width={ getPixelsFromTwClassName(yAxisWidth) }
                        hide={ !showYAxis }
                        axisLine={ false }
                        tickLine={ false }
                        type="number"
                        domain={ [0, 'auto'] }
                        tick={ { transform: 'translate(-3, 0)' } } //padding between labels and axis
                        style={ {
                            fontSize: '12px',
                            fontFamily: 'Inter; Helvetica',
                        } }
                        tickFormatter={ relative ? (value: number) => `${(value * 100).toString()} %` : valueFormater }
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
                        isAnimationActive={false}
                        cursor={ { fill: '#d1d5db', opacity: '0.15' } }
                        content={ ({ active, payload, label }) => (
                            <ChartTooltip
                                active={ active }
                                payload={ payload }
                                label={ label }
                                valueFormater={ valueFormater }
                                colors={ colors }
                            />
                        ) }
                        position={{ y: 0 }}
                    />
                ) : null }
                {
                    showLegend ? (
                        <Legend
                            verticalAlign="top"
                            height={40}
                            content={ ({ payload }) => ChartLegend({ payload }, colors) }
                        />
                    ) : null
                }
                {
                    categories.map((category, idx) => (
                        <Bar
                            key={ category }
                            name={ category }
                            type="linear"
                            stackId={ stack || relative ? 'a' : undefined }
                            dataKey={ category }
                            fill={ getHexFromColorThemeValue(getColorTheme(colors[idx]).background) }
                            isAnimationActive={ showAnimation }
                        />

                    ))
                }
            </ReChartsBarChart>
        </ResponsiveContainer>
    </div>
);

export default BarChart;
