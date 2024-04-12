import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { FunnelChart } from "components";
import { CustomTooltipProps } from "components/chart-elements/common/CustomTooltipProps";
import { currencyValueFormatter } from "lib";

const data = [
  { name: "/home", value: 1010 },
  { name: "/imprint", value: 351 },
  { name: "/cancellation", value: 271 },
  {
    name: `/special-offer`,
    value: 191,
  },
  { name: "/documentation", value: 10 },
];

const meta: Meta<typeof FunnelChart> = {
  title: "Visualizations/Chart/FunnelChart",
  component: FunnelChart,
  args: { data, className: "h-72" },
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/chart-elements/FunnelChart",
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

export const CustomColor: Story = {
  args: {
    color: "#32a852",
  },
};

export const CustomHeight: Story = {
  args: { className: "h-30" },
};

export const PreviousSmallerThanNext: Story = {
  args: {
    data: [
      { name: "/home", value: -20 },
      { name: "/imprint", value: 351 },
      { name: "/cancellation", value: 271 },
      {
        name: `/special-offer`,
        value: 191,
      },
      { name: "/documentation", value: 10 },
    ],
  },
};

export const fromPrevious: Story = {
  args: {
    calculateFrom: "previous",
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
        <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
          <div className="flex flex-1 space-x-2.5">
            <div className={`w-1.5 flex flex-col bg-${categoryPayload.color}-500 rounded`} />
            <div className="w-full">
              <p className="font-medium text-tremor-content-emphasis">{label}</p>
              <div className="flex items-center justify-between space-x-8">
                <p className="text-right text-tremor-content whitespace-nowrap">
                  {(categoryPayload.payload.normalizedValue * 100).toFixed(2)}%
                </p>
                <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
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
