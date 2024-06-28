import React, { Fragment } from "react";
import { BaseColors, Color, colorPalette, getColorClassNames, tremorTwMerge } from "lib";
import { Area as ReChartsArea, Dot } from "recharts";
import { EventProps } from "./BaseChartProps";
import { hasOnlyOneValueForThisKey } from "./utils";
import { ActiveDot } from "./types";

interface AreaProps {
  key: string;
  name: string;
  category: string;
  color: Color | string | undefined;
  activeDot?: ActiveDot;
  activeLegend?: string;
  onValueChange?: (value: EventProps) => void;
  onDotClick: (itemData: any, event: React.MouseEvent) => void;
  curveType: "basis" | "linear" | "monotone" | "natural" | "step" | "stepAfter" | "stepBefore";
  stackId?: string;
  connectNulls?: boolean;
  yAxisId?: number;
  xAxisId?: number;
  data: any[];
  showAnimation?: boolean;
  animationDuration?: number;
  xAxisCount: number;
  seriesIndex?: number;
}

export const renderArea = (props: AreaProps): JSX.Element => {
  const {
    key,
    name,
    category,
    color,
    activeDot,
    activeLegend,
    onValueChange,
    onDotClick,
    curveType,
    stackId,
    connectNulls,
    yAxisId,
    xAxisId,
    data,
    showAnimation,
    animationDuration,
    xAxisCount,
    seriesIndex,
  } = props;

  const colorClassNames = getColorClassNames(color ?? BaseColors.Gray, colorPalette.text);
  return (
    <ReChartsArea
      key={key}
      className={colorClassNames.strokeColor}
      strokeOpacity={activeDot || (activeLegend && activeLegend !== category) ? 0.3 : 1}
      activeDot={(props: any) => {
        const { cx, cy, stroke, strokeLinecap, strokeLinejoin, strokeWidth } = props;
        return (
          <Dot
            className={tremorTwMerge(
              "stroke-tremor-background dark:stroke-dark-tremor-background",
              onValueChange ? "cursor-pointer" : "",
              colorClassNames.fillColor,
            )}
            cx={cx}
            cy={cy}
            r={5}
            fill=""
            stroke={stroke}
            strokeLinecap={strokeLinecap}
            strokeLinejoin={strokeLinejoin}
            strokeWidth={strokeWidth}
            onClick={(dotProps: any, event) => onDotClick(props, event)}
          />
        );
      }}
      dot={(props: any) => {
        const { stroke, strokeLinecap, strokeLinejoin, strokeWidth, cx, cy, index } = props;

        if (
          (hasOnlyOneValueForThisKey(data, category) &&
            !(activeDot || (activeLegend && activeLegend !== category))) ||
          (activeDot?.index === index && activeDot?.dataKey === category)
        ) {
          return (
            <Dot
              key={index}
              cx={cx}
              cy={cy}
              r={5}
              stroke={stroke}
              fill=""
              strokeLinecap={strokeLinecap}
              strokeLinejoin={strokeLinejoin}
              strokeWidth={strokeWidth}
              className={tremorTwMerge(
                "stroke-tremor-background dark:stroke-dark-tremor-background",
                onValueChange ? "cursor-pointer" : "",
                colorClassNames.fillColor,
              )}
            />
          );
        }
        return <Fragment key={index}></Fragment>;
      }}
      name={name}
      type={curveType}
      dataKey={category}
      stroke=""
      fill={`url(#${color})`}
      strokeWidth={2}
      strokeLinejoin="round"
      strokeLinecap="round"
      isAnimationActive={showAnimation}
      animationDuration={animationDuration}
      stackId={stackId}
      connectNulls={connectNulls}
      yAxisId={yAxisId}
      xAxisId={xAxisId}
      data={xAxisCount > 1 ? data : undefined}
      strokeDasharray={`${seriesIndex && seriesIndex > 0 ? 5 : ""}`}
    />
  );
};
