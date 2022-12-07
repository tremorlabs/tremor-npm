import {
    Color,
    Height,
    ValueFormatter,
    Width,
} from '../../../lib/inputTypes';
import TremorBaseProps from '../../../lib/TremorBaseProps';

interface BaseChartProps extends TremorBaseProps {
    data: any[],
    categories: string[],
    dataKey: string,
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
}

export default BaseChartProps;
