import React, { useState } from 'react';

import {
    CartesianGrid,
    Legend,
    Line,
    PieChart as ReChartDonutChart,
    Pie,
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
    themeColorRange
} from 'lib';

const data = [
    {
      "name": "Group A",
      "value": 2400
    },
    {
      "name": "Group B",
      "value": 4567
    },
    {
      "name": "Group C",
      "value": 1398
    },
    {
      "name": "Group D",
      "value": 9800
    },
    {
      "name": "Group E",
      "value": 3908
    },
    {
      "name": "Group F",
      "value": 4800
    }
  ];


const DonutChart = ({
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
    height = 'h-44',
    marginTop = 'mt-0',
}: BaseChartProps) => {
    const [legendHeight, setLegendHeight] = useState(60);
    return (
        <div className={ classNames(
            'tremor-base tr-w-full',
            parseHeight(height),
            parseMarginTop(marginTop)
        ) }
        >
            <ResponsiveContainer width="100%" height="100%">
                {/* <text x={200} y={200} textAnchor="middle" dominantBaseline="middle">
                  Donut
                </text> */}
                <ReChartDonutChart>
                  {/* @Achi: Map Tailwind Colors here */}
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#64748b">
                    <p className="bg-blue-500">Total</p>
                </text>
                {/* <span x="50%" y="50%">
                  Donut
                </span> */}
                {/* { categories.map((category, idx) => ( */}
                    <Pie
                        data={ data }
                        cx="50%"
                        cy="50%"
                        isAnimationActive={false}
                        // label={renderCustomizedLabel}
                        // cx={120}
                        // cy={200}
                        startAngle={0}
                        innerRadius="80%"
                        outerRadius="100%"
                        fill="#3b82f6"
                        paddingAngle={0}
                        dataKey="value"
                        >
                    </Pie>
                  {/* )) } */}
                </ReChartDonutChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DonutChart;
