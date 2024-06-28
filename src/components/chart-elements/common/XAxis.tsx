import React from "react";
import { IntervalType, tremorTwMerge } from "lib";
import { XAxis as RechartsXAxis, Label } from "recharts";
import { ValueFormatter } from "lib/inputTypes";

interface CommonXAxisProps {
  key: string;
  showAxis: boolean;
  data: any[];
  rotateLabel?: {
    angle: number;
    verticalShift?: number;
    xAxisHeight?: number;
  };
  label?: string;
  orientation?: "top" | "bottom";
  xAxisId?: number;
  layout?: "vertical" | "horizontal";
  padding: { left: number; right: number };
  xAxisCount: number;
}

export interface HorizontalXAxisProps extends CommonXAxisProps {
  intervalType: IntervalType;
  startEndOnly: boolean;
  minTickGap: number;
  dataKey: string;
}

export interface VerticalXAxisProps extends CommonXAxisProps {
  width: number;
  valueFormatter?: ValueFormatter;
  relative?: boolean;
}

export interface VerticalXAxisPropsWithExtra extends VerticalXAxisProps {
  type: "category" | "number";
  tick: { transform: string };
  tickFormatter: ValueFormatter | undefined;
}

export interface HorizontalXAxisPropsWithExtra extends HorizontalXAxisProps {
  type: "category" | "number";
  tick: { transform: string };
  ticks: any[] | undefined;
  interval: IntervalType;
  allowDuplicatedCategory: boolean;
}

export const renderVerticalXAxis = (props: VerticalXAxisProps): JSX.Element => {
  const { relative, valueFormatter } = props;
  const xAxisProps: VerticalXAxisPropsWithExtra = {
    type: "number" as "category" | "number",
    tick: { transform: "translate(-3, 0)" },
    tickFormatter: relative ? (value: number) => `${(value * 100).toString()} %` : valueFormatter,
    ...props,
  };
  return renderXAxis(xAxisProps);
};

export const renderHorizontalXAxis = (props: HorizontalXAxisProps): JSX.Element => {
  const { data, dataKey, intervalType, startEndOnly, xAxisCount } = props;
  const xAxisProps: HorizontalXAxisPropsWithExtra = {
    type: "category" as "category" | "number",
    tick: { transform: "translate(0, 6)" },
    ticks: startEndOnly ? [data[0][dataKey], data[data.length - 1][dataKey]] : undefined,
    interval: startEndOnly ? "preserveStartEnd" : intervalType,
    allowDuplicatedCategory: xAxisCount > 1 ? false : true,
    ...props,
  };
  return renderXAxis(xAxisProps);
};

export const renderXAxis = (
  props: HorizontalXAxisPropsWithExtra | VerticalXAxisPropsWithExtra,
): JSX.Element => {
  const { label, layout, rotateLabel, showAxis, ...rechartXAxisProps } = props;

  return (
    <RechartsXAxis
      {...rechartXAxisProps}
      hide={!showAxis}
      fill=""
      stroke=""
      className={tremorTwMerge(
        // common
        `${layout && layout !== "vertical" ? "mt-4" : ""} text-tremor-label`,
        // light
        "fill-tremor-content",
        // dark
        "dark:fill-dark-tremor-content",
      )}
      tickLine={false}
      axisLine={false}
      angle={rotateLabel?.angle}
      dy={rotateLabel?.verticalShift}
      height={rotateLabel?.xAxisHeight}
    >
      {label && (
        <Label
          position="insideBottom"
          offset={-20}
          className="fill-tremor-content-emphasis text-tremor-default font-medium dark:fill-dark-tremor-content-emphasis"
        >
          {label}
        </Label>
      )}
    </RechartsXAxis>
  );
};
