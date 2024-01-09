import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { ProgressCircle } from "components";
import { BaseColors, Sizes } from "lib/constants";

const meta: Meta<typeof ProgressCircle> = {
  title: "Visualizations/Vis/ProgressCircle",
  component: ProgressCircle,
  render: (args) => <ProgressCircle {...args} />,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/vis-elements/ProgressCircle",
  },
};

export default meta;
type Story = StoryObj<typeof ProgressCircle>;

function formatNumber(num: number) {
  return num.toFixed(2);
}

const ColorsTemplate: Story = {
  render: (args) => (
    <div>
      {Object.values(BaseColors).map((color) => (
        <ProgressCircle key={color} {...args} color={color} />
      ))}
    </div>
  ),
};

const SizesTemplate: Story = {
  render: (args) => (
    <div className="flex flex-col gap-y-5">
      {Object.values(Sizes).map((size) => (
        <ProgressCircle key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Default: Story = {
  args: {
    value: 55,
  },
};

export const Colors: Story = {
  ...ColorsTemplate,
  args: {
    value: 42,
  },
};

export const differentSizes: Story = {
  ...SizesTemplate,
  args: {
    value: 86,
  },
};

export const withoutAnimation: Story = {
  args: {
    value: 56,
    showAnimation: false,
  },
};

export const withChildrenSpan: Story = {
  ...SizesTemplate,
  args: {
    value: 56,
    showAnimation: false,
    children: <span className="dark:text-white font-medium font-mono text-sm">56.3</span>,
  },
};

export const withChildrenAvatar: Story = {
  args: {
    value: 76,
    children: (
      <div className="rounded-full flex items-center justify-center h-12 w-12 bg-gray-100">
        <span className="text-sm font-medium text-gray-500">JD</span>
      </div>
    ),
  },
};

export const NoArgs: Story = {
  args: {},
};

export const Value0: Story = {
  args: { value: 0 },
};

export const Value100: Story = {
  args: { value: 100 },
};

export const ValueDecimal: Story = {
  args: { value: 45.37283 },
};

export const ChildrenWithFormatterAndClassName: Story = {
  args: { value: 45.37283, className: "text-xs text-blue-600", children: formatNumber(45.37283) },
};

export const ValueLargerThan100: Story = {
  args: { value: 110, children: 110 },
};

export const Tooltip: Story = {
  args: { value: 110, children: 110, tooltip: "100" },
};
