import BaseAnimationTimingProps from "components/chart-elements/common/BaseAnimationTimingProps";
import { Color } from "../../../lib";

type FixedProps = {
  eventType: "dot" | "category" | "bar" | "slice" | "bubble";
  categoryClicked: string;
};

type BaseEventProps = FixedProps & {
  [key: string]: number | string;
};

export type EventProps = BaseEventProps | null | undefined;

interface BaseSparkChartProps
  extends BaseAnimationTimingProps,
    React.HTMLAttributes<HTMLDivElement> {
  data: any[];
  categories: string[];
  index: string;
  colors?: Color[];
  //   valueFormatter?: ValueFormatter;
  //   startEndOnly?: boolean;
  //   showXAxis?: boolean;
  //   showYAxis?: boolean;
  //   yAxisWidth?: number;
  //   showTooltip?: boolean;
  showGradient?: boolean;
  //   showLegend?: boolean;
  //   showGridLines?: boolean;
  //   autoMinValue?: boolean;
  //   minValue?: number;
  //   maxValue?: number;
  //   allowDecimals?: boolean;
  noDataText?: string;
  onValueChange?: (value: EventProps) => void;
  //   customTooltip?: React.ComponentType<CustomTooltipType>;
  referenceLine?: number;
}

export default BaseSparkChartProps;
