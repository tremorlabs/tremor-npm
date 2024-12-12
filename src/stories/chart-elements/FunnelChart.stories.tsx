import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { FunnelChart } from "components";
import { CustomTooltipProps } from "components/chart-elements/common/CustomTooltipProps";
import { BaseColors, currencyValueFormatter } from "lib";

const data = [
  { name: "opens", value: 351 },
  { name: "visitors", value: 200 },
  {
    name: `added to cart`,
    value: 191,
  },
  { name: "orders and a longer label to test the truncate class", value: 10 },
];

const meta: Meta<typeof FunnelChart> = {
  title: "Visualizations/Chart/FunnelChart",
  component: FunnelChart,
  args: { data, className: "h-72" },
};

const FunnelChartTemplateColors: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-2">
        {Object.values(BaseColors).map((color) => (
          <FunnelChart key={color} data={data} color={color} />
        ))}
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof FunnelChart>;

export const Default: Story = {
  args: {},
};

export const Variant: Story = {
  args: {
    gradient: false,
    evolutionGradient: true,
  },
};

export const ShowArrowFalse: Story = {
  args: {
    showArrow: false,
  },
};

export const CustomHeight: Story = {
  args: { className: "h-30" },
};

export const PreviousValueSmallerThanNext: Story = {
  args: {
    data: [
      { name: "opens", value: 200 },
      { name: "visitors", value: 351 },
      {
        name: `added to cart`,
        value: 191,
      },
      { name: "orders", value: 10 },
    ],
  },
};

export const fromPrevious: Story = {
  args: {
    calculateFrom: "previous",
  },
};

export const fromPreviousWithPreviousValueSmallerThanNext: Story = {
  args: {
    calculateFrom: "previous",
    data: [
      { name: "opens", value: 200 },
      { name: "visitors", value: 351 },
      {
        name: `added to cart`,
        value: 191,
      },
      { name: "orders", value: 10 },
    ],
  },
};

export const With0: Story = {
  args: {
    data: [
      { name: "opens", value: 0 },
      { name: "visitors", value: 351 },
      {
        name: `added to cart`,
        value: 191,
      },
      { name: "orders", value: 10 },
    ],
  },
};

export const fromPreviousWith0ErrorExpected: Story = {
  args: {
    calculateFrom: "previous",
    data: [
      { name: "opens", value: 0 },
      { name: "visitors", value: 351 },
      {
        name: `added to cart`,
        value: 191,
      },
      { name: "orders", value: 10 },
    ],
  },
};

export const fromPreviousWithEvolutionGradient: Story = {
  args: {
    calculateFrom: "previous",
    gradient: false,
    evolutionGradient: true,
  },
};

export const variantCenter: Story = {
  args: {
    variant: "center",
  },
};

export const variantCenterWithoutGradient: Story = {
  args: {
    variant: "center",
    gradient: false,
  },
};

export const variantCenterWithEvolutionGradient: Story = {
  args: {
    variant: "center",
    gradient: false,
    evolutionGradient: true,
  },
};

export const withoutGridLines: Story = {
  args: {
    showGridLines: false,
  },
};

export const withoutYLabels: Story = {
  args: {
    showYAxis: false,
  },
};

export const withouXAxis: Story = {
  args: {
    showXAxis: false,
  },
};

export const NoAxes: Story = {
  args: { showXAxis: false, showYAxis: false },
};

export const onValueChange: Story = {
  args: {
    onValueChange: (value) => alert(JSON.stringify(value)),
  },
};

export const NoData = {
  args: {
    data: [],
  },
};

export const NoDataText: Story = {
  args: {
    data: [],
    noDataText: "No data, try again later.",
  },
};

export const RotateXLabelsHorizontal: Story = {
  args: {
    rotateLabelX: { angle: -45, verticalShift: 0, xAxisHeight: 100 },
  },
};

export const ValueFormatter: Story = {
  args: {
    valueFormatter: (e) => currencyValueFormatter(e),
  },
};

export const CustomTooltipSimple: Story = {
  args: {
    customTooltip: (props: CustomTooltipProps) => {
      const { payload, active, label } = props;

      if (!active || !payload) return null;

      const categoryPayload = payload?.[0];
      if (!categoryPayload) return null;
      return (
        <div className="rounded-tremor-default text-tremor-default bg-tremor-background shadow-tremor-dropdown border-tremor-border w-56 border p-2">
          <div className="flex flex-1 space-x-2.5">
            <div className={`flex w-1.5 flex-col bg-${categoryPayload.color}-500 rounded-sm`} />
            <div className="w-full">
              <p className="text-tremor-content-emphasis font-medium">{label}</p>
              <div className="flex items-center justify-between space-x-8">
                <p className="text-tremor-content text-right whitespace-nowrap">
                  {(categoryPayload.payload.normalizedValue * 100).toFixed(2)}%
                </p>
                <p className="text-tremor-content-emphasis text-right font-medium whitespace-nowrap">
                  {currencyValueFormatter(categoryPayload.value as number)}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
};

export const AxisLabels: Story = {
  args: {
    xAxisLabel: "Flow",
    yAxisLabel: "Amount (USD)",
  },
};

export const Colors: Story = {
  ...FunnelChartTemplateColors,
};
