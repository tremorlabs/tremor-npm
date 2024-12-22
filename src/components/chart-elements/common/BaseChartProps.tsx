import { LabelPosition } from "recharts/types/component/Label";
import { Color, ValueFormatter, IntervalType } from "../../../lib";
import type BaseAnimationTimingProps from "./BaseAnimationTimingProps";
import { CustomTooltipProps } from "./CustomTooltipProps";

type FixedProps = {
  eventType: "dot" | "category" | "bar" | "slice" | "bubble";
  categoryClicked: string;
};

type BaseEventProps = FixedProps & {
  [key: string]: number | string;
};

export type EventProps = BaseEventProps | null | undefined;

export interface DataLabelOptions {
  position?: LabelPosition;
  offset?: number;
  angle?: number;
  fontSize?: number;
}

interface BaseChartProps extends BaseAnimationTimingProps, React.HTMLAttributes<HTMLDivElement> {
  data: any[];
  categories: string[];
  index: string;
  colors?: (Color | string)[];
  valueFormatter?: ValueFormatter;
  startEndOnly?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showXAxisLine?: boolean;
  showYAxisLine?: boolean;
  yAxisWidth?: number;
  intervalType?: IntervalType;
  showTooltip?: boolean;
  showLegend?: boolean;
  showGridLines?: boolean;
  autoMinValue?: boolean;
  minValue?: number;
  maxValue?: number;
  allowDecimals?: boolean;
  noDataText?: string;
  onValueChange?: (value: EventProps) => void;
  enableLegendSlider?: boolean;
  padding?: { left?: number; right?: number };
  customTooltip?: React.ComponentType<CustomTooltipProps>;
  rotateLabelX?: {
    angle: number;
    verticalShift?: number;
    xAxisHeight?: number;
  };
  tickGap?: number;
  dataLabelOptions?: Record<string, DataLabelOptions>;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export default BaseChartProps;
