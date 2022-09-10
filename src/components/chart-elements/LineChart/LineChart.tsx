import React from 'react';

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart as ReChartsLineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import BaseChartProps from '../common/BaseChartProps';
import ChartLegend from 'components/chart-elements/common/ChartLegend';
import ChartTooltip from '../common/ChartTooltip';

import {
    classNames,
    defaultValueFormater,
    getColorTheme,
    getHexFromColorThemeValue,
    getPixelsFromTwClassName,
    themeColorRange
} from 'lib';

const LineChart = ({
    data = [],
    categories = [],
    dataKey,
    colors = themeColorRange,
    valueFormater = defaultValueFormater,
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
}: BaseChartProps) => {
    return (
        <div className={ classNames('w-full', height, marginTop) }>
            <ResponsiveContainer width="100%" height="100%">
                <ReChartsLineChart
                    data={ data }
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
                            horizontal={ true }
                            vertical={ false }
                        />
                    ) : null }
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
                        tickLine={ false }
                        axisLine={ false }
                    />
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
                        tickFormatter={ valueFormater  }
                    />
                    { showTooltip ? (
                        <Tooltip
                            isAnimationActive={ false }
                            cursor={ { stroke: '#d1d5db', strokeWidth: 1 } }
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
                    { showLegend ? (
                        <Legend
                            verticalAlign="top"
                            height={ 40 }
                            content={ ({ payload }) => ChartLegend({ payload }, colors) }
                        />
                    ) : null }
                    { categories.map((category, idx) => (
                        <Line
                            key={ category }
                            name={ category }
                            type="linear"
                            dataKey={ category }
                            stroke={ getHexFromColorThemeValue(getColorTheme(colors[idx]).background) }
                            strokeWidth={ 2 }
                            dot={ false }
                            isAnimationActive={ showAnimation }
                        />
                    )) }
                </ReChartsLineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChart;
