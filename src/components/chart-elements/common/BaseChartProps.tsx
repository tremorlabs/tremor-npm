import {
    Color,
    Height,
    MarginTop,
    ValueFormatter,
    Width,
} from '../../../lib';

interface BaseChartProps {
    data: any[],
    categories: string[],
    dataKey: string,
    colors?: Color[],
    valueFormatter?: ValueFormatter,
    startEndOnly?: boolean,
    showXAxis?: boolean,
    showYAxis?: boolean,
    yAxisWidth?: Width,
    showAnimation?: boolean,
    showTooltip?: boolean,
    showGradient?: boolean,
    showLegend?: boolean,
    showGridLines?: boolean,
    height?: Height,
    marginTop?: MarginTop,
}

export default BaseChartProps;
