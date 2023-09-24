"use client";
import React, { useEffect } from "react";
import { tremorTwMerge } from "lib";
import {
  Pie,
  PieChart as ReChartsDonutChart,
  ResponsiveContainer,
  Tooltip,
  Sector,
} from "recharts";

import NoData from "../common/NoData";
import { Color, ValueFormatter } from "../../../lib/inputTypes";
import { defaultValueFormatter, themeColorRange } from "lib";

import { parseData, parseLabelInput } from "./inputParser";
import { DonutChartTooltip } from "./DonutChartTooltip";

import type BaseAnimationTimingProps from "../common/BaseAnimationTimingProps";
import type { EventProps } from "components/chart-elements/common";

type DonutChartVariant = "donut" | "pie";

export interface DonutChartProps extends BaseAnimationTimingProps {
  data: any[];
  category?: string;
  index?: string;
  colors?: Color[];
  variant?: DonutChartVariant;
  valueFormatter?: ValueFormatter;
  label?: string;
  showLabel?: boolean;
  showAnimation?: boolean;
  showTooltip?: boolean;
  noDataText?: string;
  onValueChange?: (value?: EventProps) => void;
  className?: string;
}

const renderInactiveShape = (props: any) => {
  const {
    cx,
    cy,
    // midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    // fill,
    // payload,
    // percent,
    // value,
    // activeIndex,
    className,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        className={className}
        fill=""
        opacity={0.3}
        style={{ outline: "none" }}
      />
    </g>
  );
};

const DonutChart = React.forwardRef<HTMLDivElement, DonutChartProps>((props, ref) => {
  const {
    data = [],
    category = "value",
    index = "name",
    colors = themeColorRange,
    variant = "donut",
    valueFormatter = defaultValueFormatter,
    label,
    showLabel = true,
    animationDuration = 900,
    showAnimation = true,
    showTooltip = true,
    noDataText,
    onValueChange,
    className,
    ...other
  } = props;
  const isDonut = variant == "donut";

  const parsedLabelInput = parseLabelInput(label, valueFormatter, data, category);

  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined);
  const hasOnValueChange = !!onValueChange;

  function onShapeClick(data: any, index: number, event: React.MouseEvent) {
    event.stopPropagation();

    if (!hasOnValueChange) return;
    if (activeIndex === index) {
      setActiveIndex(undefined);
      onValueChange?.(null);
    } else {
      setActiveIndex(index);
      onValueChange?.({
        eventType: "slice",
        ...data.payload.payload,
      });
    }
  }

  useEffect(() => {
    const pieSectors = document.querySelectorAll(".recharts-pie-sector");
    if (pieSectors) {
      pieSectors.forEach((sector) => {
        sector.setAttribute("style", "outline: none");
      });
    }
  }, [activeIndex]);

  return (
    <div ref={ref} className={tremorTwMerge("w-full h-44", className)} {...other}>
      <ResponsiveContainer className="h-full w-full">
        {data?.length ? (
          <ReChartsDonutChart
            onClick={
              hasOnValueChange && activeIndex
                ? () => {
                    setActiveIndex(undefined);
                    onValueChange?.(null);
                  }
                : undefined
            }
          >
            {showLabel && isDonut ? (
              <text
                className={tremorTwMerge(
                  // light
                  "fill-tremor-content-emphasis",
                  // dark
                  "dark:fill-dark-tremor-content-emphasis",
                )}
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {parsedLabelInput}
              </text>
            ) : null}
            <Pie
              className={tremorTwMerge(
                "stroke-tremor-background dark:stroke-dark-tremor-background",
                onValueChange ? "cursor-pointer" : "cursor-default",
              )}
              data={parseData(data, colors)}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius={isDonut ? "75%" : "0%"}
              outerRadius="100%"
              stroke=""
              strokeLinejoin="round"
              dataKey={category}
              nameKey={index}
              isAnimationActive={showAnimation}
              animationDuration={animationDuration}
              onClick={onShapeClick}
              activeIndex={activeIndex}
              inactiveShape={renderInactiveShape}
              style={{ outline: "none" }}
            />
            {showTooltip ? (
              <Tooltip
                wrapperStyle={{ outline: "none" }}
                isAnimationActive={false}
                content={({ active, payload }) => (
                  <DonutChartTooltip
                    active={active}
                    payload={payload}
                    valueFormatter={valueFormatter}
                  />
                )}
              />
            ) : null}
          </ReChartsDonutChart>
        ) : (
          <NoData noDataText={noDataText} />
        )}
      </ResponsiveContainer>
    </div>
  );
});

DonutChart.displayName = "DonutChart";

export default DonutChart;
