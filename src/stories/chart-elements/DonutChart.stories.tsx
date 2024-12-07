import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { DonutChart } from "components";

import { CustomTooltipProps } from "components/chart-elements/common/CustomTooltipProps";
import { currencyValueFormatter } from "lib";
import {
  simpleSingleCategoryData as data,
  simpleBaseChartData as data2,
} from "stories/chart-elements/helpers/testData";

const meta: Meta<typeof DonutChart> = {
  title: "Visualizations/Chart/DonutChart",
  component: DonutChart,
  args: { category: "sales", index: "city", data },
};

export default meta;
type Story = StoryObj<typeof DonutChart>;

export const Default: Story = {
  args: {},
};

export const ValueFormatter: Story = {
  args: { valueFormatter: currencyValueFormatter },
};

export const CustomLabel: Story = {
  args: { valueFormatter: currencyValueFormatter, label: "Hello there" },
};

export const LabelDisabled: Story = {
  args: { valueFormatter: currencyValueFormatter, label: "Hello there", showLabel: false },
};

export const OtherColors: Story = {
  args: { colors: ["blue", "amber", "sky", "emerald", "rose", "orange"] },
};

export const CustomColors: Story = {
  args: {
    colors: ["#32a852", "#fcba03", "orange-600", "blue-400", "violet-400", "rose-400"],
  },
};

export const MoreDatapointsThanColors: Story = {
  args: {
    data: [
      // extra long data array
      ...data,
      ...data,
    ],
    colors: ["blue", "amber", "sky", "emerald", "rose", "orange"],
  },
};

export const LongValues: Story = {
  args: {
    data: data.map((dataPoint) => ({
      ...dataPoint,
      sales: dataPoint.sales * 10000000,
    })),
    valueFormatter: currencyValueFormatter,
  },
};

export const VariantPie: Story = {
  args: { variant: "pie" },
};

export const NoData: Story = {
  args: { data: [] },
};

export const NoDataText: Story = {
  args: { data: [], noDataText: "No data, try again later." },
};

export const Animation: Story = {
  args: {
    showAnimation: true,
  },
};

export const LongAnimation: Story = {
  args: {
    showAnimation: true,
    animationDuration: 5000,
  },
};

export const OnValueChangeExample: Story = {
  args: { onValueChange: (value) => alert(JSON.stringify(value)) },
};

export const OnValueChangePieExample: Story = {
  args: { variant: "pie", onValueChange: (value) => alert(JSON.stringify(value)) },
};

//Custom tooltips
export const CustomTooltipSimple: Story = {
  args: {
    data: data2,
    index: "month",
    category: "Sales",
    valueFormatter: currencyValueFormatter,
    customTooltip: (props: CustomTooltipProps) => {
      const { payload, active, label } = props;
      if (!active || !payload) return null;
      const categoryPayload = payload?.[0];
      if (!categoryPayload) return null;
      return (
        <div className="rounded-tremor-default text-tremor-default bg-tremor-background shadow-tremor-dropdown border-tremor-border w-56 border p-2">
          <div className="flex flex-1 space-x-2.5">
            <div className={`flex w-1.5 flex-col bg-${categoryPayload?.color}-500 rounded-sm`} />
            <div className="w-full">
              <div className="flex items-center justify-between space-x-8">
                <p className="text-tremor-content text-right whitespace-nowrap">
                  {categoryPayload.name}
                </p>
                <p className="text-tremor-content-emphasis text-right font-medium whitespace-nowrap">
                  {currencyValueFormatter(categoryPayload.value as number)}
                </p>
              </div>
              <p>{label}</p>
              <p>{categoryPayload.dataKey}</p>
            </div>
          </div>
        </div>
      );
    },
  },
};
