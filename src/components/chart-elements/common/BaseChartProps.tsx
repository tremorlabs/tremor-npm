import {
    Color,
    Height,
    MarginTop,
    PaddingBottom,
    PaddingLeft,
    PaddingRight,
    PaddingTop,
    ValueFormater,
    Width,
} from '../../../lib';

interface BaseChartProps {
    data: any[],
    categories: string[],
    dataKey: string,
    colors?: Color[],
    valueFormater?: ValueFormater,
    startEndOnly?: boolean,
    showXAxis?: boolean,
    showYAxis?: boolean,
    yAxisWidth?: Width,
    showAnimation?: boolean,
    showTooltip?: boolean,
    showLegend?: boolean,
    showGridLines?: boolean,
    height?: Height,
    paddingLeft?: PaddingLeft,
    paddingTop?: PaddingTop,
    paddingRight?: PaddingRight,
    paddingBottom?: PaddingBottom,
    marginTop?: MarginTop,
}

export default BaseChartProps;
