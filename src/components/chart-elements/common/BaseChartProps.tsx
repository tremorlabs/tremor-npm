import {
    Color,
    Height,
    MarginTop,
    PickKeyOfType,
    ValueFormatter,
    Width,
} from '../../../lib';

interface BaseChartProps<T> {
    data: T[],
    categories: (PickKeyOfType<T, number>)[],
    dataKey: PickKeyOfType<T, string>,
    colors?: Color[],
    valueFormatter?: ValueFormatter,
    autoMinValue?: boolean,
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
