import React, {useState} from 'react';

import {
    Legend,
    RadialBar,
    RadialBarChart as ReChartsRadialChart,
    ResponsiveContainer,
} from 'recharts';

import BaseChartProps from '../common/BaseChartProps';
import ChartLegend from 'components/chart-elements/common/ChartLegend';

import {
    classNames,
    getColorTheme,
    getHexFromColorThemeValue,
    parseHeight,
    parseMarginTop,
    themeColorRange,
} from 'lib';

export interface RadialBarChartProps extends BaseChartProps {
    minAngle?: number
    maxAngle?: number
    innerRadius?: number | string
    outerRadius?: number | string
    barSize?: number
    barGap?: number
    barCategoryGap?: number | string
    cx?: number | string
    cy?: number | string
    startAngle?: number
    endAngle?: number
    showLabel?: boolean
}

const RadialBarChart = ({
    data = [],
    dataKey,
    colors = themeColorRange,
    showAnimation = true,
    showLegend = true,
    showLabel = true,
    height = 'h-80',
    marginTop = 'mt-0',
    startAngle = 0,
    endAngle = 360,
    innerRadius = '30%',
    outerRadius = '100%',
    barSize = 12,
    barGap = 4,
    barCategoryGap = '10%',
    cx='50%',
    cy='50%'
}: RadialBarChartProps) => {
    const coloredData = data.map((ele, idx) => {
        ele.fill =  getHexFromColorThemeValue(getColorTheme(colors[idx]).background);
        return ele;
    });

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
                <ReChartsRadialChart 
                    data={coloredData} 
                    innerRadius={innerRadius} 
                    outerRadius={outerRadius} 
                    barSize={barSize} 
                    barCategoryGap={barCategoryGap} 
                    barGap={barGap} 
                    cx={cx} 
                    cy={cy} 
                    startAngle={startAngle} 
                    endAngle={endAngle}
                    
                    
                >
                    <RadialBar
                        background 
                        isAnimationActive={ showAnimation }
                        dataKey={dataKey}
                        label={(showLabel) ? { position: 'insideStart', fill: '#fff',  }: undefined}
                    />
                    {showLegend ? (
                        <Legend
                            verticalAlign="top"
                            layout="vertical"
                            height={legendHeight}
                            content={({payload}) => ChartLegend({payload}, colors, setLegendHeight)}
                        />
                    ) : null}
                </ReChartsRadialChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RadialBarChart;
