import {
  Color,
  ValueFormatter,
  IntervalType,
  HorizontalPosition,
  VerticalPosition,
} from "../../../lib";
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

interface XAxisConfig {
  orientation: VerticalPosition;
  series?: string[];
  valueFormatter?: ValueFormatter;
}

export interface YAxisConfig {
  autoMinValue?: boolean;
  minValue?: number;
  maxValue?: number;
  orientation: HorizontalPosition;
  categories?: string[];
  valueFormatter?: ValueFormatter;
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
  customTooltip?: React.ComponentType<CustomTooltipProps>;
  rotateLabelX?: {
    angle: number;
    verticalShift?: number;
    xAxisHeight?: number;
  };
  tickGap?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  xAxisConfigs?: XAxisConfig[];
  yAxisConfigs?: YAxisConfig[];
}

export default BaseChartProps;
