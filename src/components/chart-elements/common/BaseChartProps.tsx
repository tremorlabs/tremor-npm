import { Color, ValueFormatter } from "../../../lib";
import type BaseAnimatedProps from "./BaseAnimatedProps";
interface BaseChartProps extends BaseAnimatedProps {
  data: any[];
  categories: string[];
  index: string;
  colors?: Color[];
  valueFormatter?: ValueFormatter;
  startEndOnly?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  yAxisWidth?: number;
  showTooltip?: boolean;
  showGradient?: boolean;
  showLegend?: boolean;
  showGridLines?: boolean;
  autoMinValue?: boolean;
  minValue?: number;
  maxValue?: number;
  allowDecimals?: boolean;
  noDataText?: string;
}

export default BaseChartProps;
