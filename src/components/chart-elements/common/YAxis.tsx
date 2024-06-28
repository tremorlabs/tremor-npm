import { tremorTwMerge } from "lib";
import React from "react";
import { Label, YAxis as RechartsYAxis } from "recharts";
import { AxisDomain } from "recharts/types/util/types";
import { IntervalType, ValueFormatter } from "lib/inputTypes";

interface CommonYAxisProps {
  key: string;
  showAxis: boolean;
  label?: string;
  orientation?: "left" | "right";
  yAxisId?: number;
  layout?: "vertical" | "horizontal";
  allowDecimals: boolean;
  xAxisCount: number;
}

export interface HorizontalYAxisProps extends CommonYAxisProps {
  width: number;
  domain: AxisDomain;
  valueFormatter?: ValueFormatter;
  relative?: boolean;
}

export interface VerticalYAxisProps extends CommonYAxisProps {
  intervalType: IntervalType;
  startEndOnly: boolean;
  data: any[];
  dataKey: string;
  minTickGap: number;
}

export interface VerticalYAxisPropsWithExtra extends VerticalYAxisProps {
  type: "category" | "number";
  tick: { transform: string };
  ticks: any[] | undefined;
  interval: IntervalType;
  allowDuplicatedCategory: boolean;
}

export interface HorizontalYAxisPropsWithExtra extends HorizontalYAxisProps {
  type: "category" | "number";
  tick: { transform: string };
  tickFormatter: ValueFormatter | undefined;
}

export const renderVerticalYAxis = (props: VerticalYAxisProps): JSX.Element => {
  const { data, dataKey, intervalType, startEndOnly, xAxisCount } = props;
  const yAxisProps: VerticalYAxisPropsWithExtra = {
    type: "category",
    tick: { transform: "translate(0, 6)" },
    ticks: startEndOnly ? [data[0][dataKey], data[data.length - 1][dataKey]] : undefined,
    interval: startEndOnly ? "preserveStartEnd" : intervalType,
    allowDuplicatedCategory: xAxisCount > 1 ? false : true,
    ...props,
  };
  return renderYAxis(yAxisProps);
};

export const renderHorizontalYAxis = (props: HorizontalYAxisProps): JSX.Element => {
  const { relative, valueFormatter } = props;
  const yAxisProps: HorizontalYAxisPropsWithExtra = {
    type: "number",
    tick: { transform: "translate(-3, 0)" },
    tickFormatter: relative ? (value: number) => `${(value * 100).toString()} %` : valueFormatter,
    ...props,
  };
  return renderYAxis(yAxisProps);
};

export const renderYAxis = (props: HorizontalYAxisProps | VerticalYAxisProps): JSX.Element => {
  const { label, showAxis, ...rechartYAxisProps } = props;

  return (
    <RechartsYAxis
      {...rechartYAxisProps}
      hide={!showAxis}
      fill=""
      stroke=""
      className={tremorTwMerge(
        // common
        "text-tremor-label",
        // light
        "fill-tremor-content",
        // dark
        "dark:fill-dark-tremor-content",
      )}
      tickLine={false}
      axisLine={false}
    >
      {label && (
        <Label
          position="insideLeft"
          style={{ textAnchor: "middle" }}
          angle={-90}
          offset={-15}
          className="fill-tremor-content-emphasis text-tremor-default font-medium dark:fill-dark-tremor-content-emphasis"
        >
          {label}
        </Label>
      )}
    </RechartsYAxis>
  );
};
