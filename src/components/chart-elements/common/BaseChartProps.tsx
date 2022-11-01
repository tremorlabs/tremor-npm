import {
    Color,
    Height,
    MarginTop,
    ValueFormatter,
    Width,
} from '../../../lib';
import { ChartReferenceLineProps } from './ChartReferenceLineProps';


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
    showReferenceLines: boolean,
    referenceLines?: ChartReferenceLineProps[];
}

export default BaseChartProps;
