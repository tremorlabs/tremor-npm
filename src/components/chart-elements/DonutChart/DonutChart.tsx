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
      "value": 2400,
      "fill": "#2563eb",
    },
    {
      "name": "Group B",
      "value": 4567,
      "fill": "#3b82f6",
    },
    {
      "name": "Group C",
      "value": 1398,
      "fill": "#60a5fa",
    },
    {
      "name": "Group D",
      "value": 9800,
      "fill": "#93c5fd",
    },
    {
      "name": "Group E",
      "value": 3908,
      "fill": "#bfdbfe",
    }
  ];


const DonutChart = ({
    categories = [],
    dataKey,
    colors = themeColorRange,
    valueFormatter = defaultValueFormatter,
    showAnimation = true,
    showTooltip = true,
    showLegend = true,
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
                <p>Test</p>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#64748b">
                  Total
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
                        startAngle={90}
                        endAngle={-270}
                        innerRadius="75%"
                        outerRadius="100%"
                        fill="fill"
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
