import React from "react";
import { BaseColors, Color, colorPalette, getColorClassNames, tremorTwMerge } from "lib";
import { deepEqual } from "../common/utils";
import { Bar as RechartsBar } from "recharts";
import { EventProps } from "./BaseChartProps";
import { Category } from "./types";

const renderShape = (
  props: any,
  activeBar: any | undefined,
  activeLegend: string | undefined,
  layout: string,
) => {
  const { fillOpacity, name, payload, value } = props;
  let { x, width, y, height } = props;

  if (layout === "horizontal" && height < 0) {
    y += height;
    height = Math.abs(height); // height must be a positive number
  } else if (layout === "vertical" && width < 0) {
    x += width;
    width = Math.abs(width); // width must be a positive number
  }

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      opacity={
        activeBar || (activeLegend && activeLegend !== name)
          ? deepEqual(activeBar, { ...payload, value })
            ? fillOpacity
            : 0.3
          : fillOpacity
      }
    />
  );
};

interface BarProps {
  key: string;
  name: string;
  category: Category;
  color: string | Color | undefined;
  stackId?: string;
  showAnimation?: boolean;
  animationDuration?: number;
  activeBar?: any;
  activeLegend?: string;
  onValueChange?: (value: EventProps) => void;
  onBarClick?: (data: any, idx: number, event: React.MouseEvent) => void;
  layout: "vertical" | "horizontal";
  yAxisId?: number;
  xAxisId?: number;
  data: any[];
  xAxisCount: number;
  seriesIndex?: number;
}

export const renderBar = (props: BarProps): JSX.Element => {
  const {
    key,
    name,
    category,
    color,
    stackId,
    showAnimation,
    animationDuration,
    activeBar,
    activeLegend,
    onValueChange,
    onBarClick,
    yAxisId,
    xAxisId,
    data,
    xAxisCount,
    seriesIndex,
    layout,
  } = props;

  const colorClassNames = getColorClassNames(color ?? BaseColors.Gray, colorPalette.background);
  return (
    <RechartsBar
      key={key}
      className={tremorTwMerge(colorClassNames.fillColor, onValueChange ? "cursor-pointer" : "")}
      name={name}
      type="linear"
      stackId={stackId}
      dataKey={category}
      fill=""
      isAnimationActive={showAnimation}
      animationDuration={animationDuration}
      shape={(props: any) => renderShape(props, activeBar, activeLegend, layout)}
      onClick={onBarClick}
      yAxisId={yAxisId}
      xAxisId={xAxisId}
      data={xAxisCount > 1 ? data : undefined}
      strokeDasharray={`${seriesIndex && seriesIndex > 0 ? 5 : ""}`}
    />
  );
};
