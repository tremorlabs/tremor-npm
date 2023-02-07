import { Color, Height, MarginTop, ValueFormatter } from "../../../lib";

interface BaseChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[];
  categories: string[];
  dataKey: string;
  colors?: Color[];
  valueFormatter?: ValueFormatter;
  startEndOnly?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  yAxisWidth?: number;
  showAnimation?: boolean;
  showTooltip?: boolean;
  showGradient?: boolean;
  showLegend?: boolean;
  showGridLines?: boolean;
  height?: Height;
  marginTop?: MarginTop;
  autoMinValue?: boolean;
  minValue?: number;
  maxValue?: number;
}

export default BaseChartProps;
