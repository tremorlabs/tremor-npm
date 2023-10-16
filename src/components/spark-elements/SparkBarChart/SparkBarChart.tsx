"use client";
import { colorPalette, getColorClassNames, tremorTwMerge } from "lib";
import React, { useState } from "react";

import {
  Bar,
  BarChart as ReChartsBarChart,
  ResponsiveContainer,
  ReferenceLine,
  XAxis,
} from "recharts";

import { BaseColors, themeColorRange } from "lib";
import BaseSparkChartProps from "../common/BaseSparkChartProps";
import { constructCategoryColors, deepEqual } from "components/chart-elements/common/utils";
import NoData from "components/chart-elements/common/NoData";

const renderShape = (props: any, activeBar: any | undefined, activeLegend: string | undefined) => {
  const { x, y, width, height, fillOpacity, name, payload, value } = props;

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

export interface SparkBarChartProps extends BaseSparkChartProps {
  layout?: "vertical" | "horizontal";
  stack?: boolean;
  relative?: boolean;
}

const SparkBarChart = React.forwardRef<HTMLDivElement, SparkBarChartProps>((props, ref) => {
  const {
    data = [],
    categories = [],
    index,
    colors = themeColorRange,
    layout = "horizontal",
    stack = false,
    relative = false,
    animationDuration = 900,
    showAnimation = false,
    noDataText,
    onValueChange,
    referenceLine,
    className,
    ...other
  } = props;
  const categoryColors = constructCategoryColors(categories, colors);
  const [activeBar, setActiveBar] = React.useState<any | undefined>(undefined);
  const [activeLegend, setActiveLegend] = useState<string | undefined>(undefined);
  const hasOnValueChange = !!onValueChange;

  function onBarClick(data: any, idx: number, event: React.MouseEvent) {
    event.stopPropagation();
    if (!onValueChange) return;
    if (deepEqual(activeBar, { ...data.payload, value: data.value })) {
      setActiveLegend(undefined);
      setActiveBar(undefined);
      onValueChange?.(null);
    } else {
      setActiveLegend(data.tooltipPayload?.[0]?.dataKey);
      setActiveBar({
        ...data.payload,
        value: data.value,
      });
      onValueChange?.({
        eventType: "bar",
        categoryClicked: data.tooltipPayload?.[0]?.dataKey,
        ...data.payload,
      });
    }
  }

  return (
    <div ref={ref} className={tremorTwMerge("w-full h-80", className)} {...other}>
      <ResponsiveContainer className="h-full w-full">
        {data?.length ? (
          <ReChartsBarChart
            data={data}
            stackOffset={relative ? "expand" : "none"}
            layout={layout === "vertical" ? "vertical" : "horizontal"}
            onClick={
              hasOnValueChange && (activeLegend || activeBar)
                ? () => {
                    setActiveBar(undefined);
                    setActiveLegend(undefined);
                    onValueChange?.(null);
                  }
                : undefined
            }
          >
            <XAxis hide dataKey={index} />
            {categories.map((category) => (
              <Bar
                className={tremorTwMerge(
                  getColorClassNames(
                    categoryColors.get(category) ?? BaseColors.Gray,
                    colorPalette.background,
                  ).fillColor,
                  onValueChange ? "cursor-pointer" : "",
                )}
                key={category}
                name={category}
                type="linear"
                stackId={stack || relative ? "a" : undefined}
                dataKey={category}
                fill=""
                isAnimationActive={showAnimation}
                animationDuration={animationDuration}
                shape={(props) => renderShape(props, activeBar, activeLegend)}
                onClick={onBarClick}
              />
            ))}
            {referenceLine ? (
              <ReferenceLine
                className={tremorTwMerge(
                  // common
                  "stroke-1",
                  // light
                  "stroke-tremor-content-subtle",
                  // dark
                  "dark:stroke-dark-tremor-content-subtle",
                )}
                y={referenceLine}
                stroke=""
                strokeDasharray="3 3"
                strokeWidth={1}
              />
            ) : null}
          </ReChartsBarChart>
        ) : (
          <NoData noDataText={noDataText} />
        )}
      </ResponsiveContainer>
    </div>
  );
});

SparkBarChart.displayName = "SparkBarChart";

export default SparkBarChart;
