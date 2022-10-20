import React, {useState} from 'react';

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
    defaultValueFormatter,
    getColorTheme,
    getHexFromColorThemeValue,
    getPixelsFromTwClassName,
    parseHeight,
    parseMarginTop,
    themeColorRange,
} from 'lib';

export interface LineChartProps extends BaseChartProps {
    strokeWidth?: number
    strokeDash?: string
}

const LineChart = ({
    data = [],
    categories = [],
    dataKey,
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
    height = 'h-80',
    marginTop = 'mt-0',
    strokeWidth = 2,
    strokeDash,
}: LineChartProps) => {
    const [legendHeight, setLegendHeight] = useState(60);
    return (
        <div
            className={classNames(
                'tremor-base tr-w-full',
                parseHeight(height),
                parseMarginTop(marginTop)
            )}
        >
            <ResponsiveContainer width="100%" height="100%">
                <ReChartsLineChart data={data}>
                    {showGridLines ? (
                        <CartesianGrid
                            strokeDasharray="3 3"
                            horizontal={true}
                            vertical={false}
                        />
                    ) : null}
                    <XAxis
                        hide={!showXAxis}
                        dataKey={dataKey}
                        interval="preserveStartEnd"
                        tick={{transform: 'translate(0, 6)'}}
                        ticks={
                            startEndOnly
                                ? [data[0][dataKey], data[data.length - 1][dataKey]]
                                : undefined
                        }
                        style={{
                            fontSize: '12px',
                            fontFamily: 'Inter; Helvetica',
                        }}
                        tickLine={false}
                        axisLine={false}
                        padding={{left: 10, right: 10}}
                        minTickGap={5}
                    />
                    <YAxis
                        width={getPixelsFromTwClassName(yAxisWidth)}
                        hide={!showYAxis}
                        axisLine={false}
                        tickLine={false}
                        type="number"
                        domain={[0, 'auto']}
                        tick={{transform: 'translate(-3, 0)'}}
                        style={{
                            fontSize: '12px',
                            fontFamily: 'Inter; Helvetica',
                        }}
                        tickFormatter={valueFormatter}
                    />
                    {showTooltip ? (
                        <Tooltip
                            // ongoing issue: https://github.com/recharts/recharts/issues/2920
                            wrapperStyle={{outline: 'none'}}
                            isAnimationActive={false}
                            cursor={{stroke: '#d1d5db', strokeWidth: 1}}
                            content={({active, payload, label}) => (
                                <ChartTooltip
                                    active={active}
                                    payload={payload}
                                    label={label}
                                    valueFormatter={valueFormatter}
                                    colors={colors}
                                />
                            )}
                            position={{y: 0}}
                        />
                    ) : null}
                    {showLegend ? (
                        <Legend
                            verticalAlign="top"
                            height={legendHeight}
                            content={({payload}) =>
                                ChartLegend({payload}, colors, setLegendHeight)
                            }
                        />
                    ) : null}
                    {categories.map((category, idx) => (
                        <Line
                            key={category}
                            name={category}
                            type="linear"
                            dataKey={category}
                            stroke={getHexFromColorThemeValue(
                                getColorTheme(colors[idx]).background
                            )}
                            strokeDasharray={strokeDash}
                            dot={false}
                            isAnimationActive={showAnimation}
                            strokeWidth={strokeWidth}
                        />
                    ))}
                </ReChartsLineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChart;
