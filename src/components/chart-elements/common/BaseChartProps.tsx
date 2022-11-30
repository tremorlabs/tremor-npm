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
    autoMinValue?: boolean,
    startEndOnly?: boolean,
    showXAxis?: boolean,
    showYAxis?: boolean,
    yAxisMax?: string | number | 'auto' | 'dataMin' | 'dataMax',
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
