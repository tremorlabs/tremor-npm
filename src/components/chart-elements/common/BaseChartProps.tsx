import { ReactNode } from "react";
import { Color, ValueFormatter, IntervalType } from "../../../lib";
import type BaseAnimationTimingProps from "./BaseAnimationTimingProps";
import { CustomTooltipType } from "./CustomTooltipProps";

type FixedProps = {
  eventType: "dot" | "category" | "bar" | "slice" | "bubble";
  categoryClicked: string;
};

type BaseEventProps = FixedProps & {
  [key: string]: number | string;
};

export type EventProps = BaseEventProps | null | undefined;

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
  children?: ReactNode;
  maxValue?: number;
  allowDecimals?: boolean;
  noDataText?: string;
  onValueChange?: (value: EventProps) => void;
  enableLegendSlider?: boolean;
  customTooltip?: React.ComponentType<CustomTooltipType>;
  rotateLabelX?: {
    angle: number;
    verticalShift?: number;
    xAxisHeight?: number;
  };
  renderShape?: (props: any, activeBar: any | undefined, activeLegend: string | undefined, layout: string | undefined) => any;
  xAxisTextAnchor?: string;
  margin?: any;
  xAxisProps?: any;
  yAxisProps?: any;
  gridProps?: any;
  barProps?: any;
  tooltipValueFormatter?: ValueFormatter;
}

export default BaseChartProps;
