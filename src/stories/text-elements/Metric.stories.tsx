import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { BaseColors } from "lib/constants";
import { Metric } from "components";

const meta: Meta<typeof Metric> = {
  title: "Tremor/TextElements/Metric",
  component: Metric,
};

export default meta;
type Story = StoryObj<typeof Metric>;

export const Default: Story = {
  args: { children: "USD 80.000" },
};

export const Colors: Story = {
  render: (args) => (
    <>
      <Metric {...args} />
      {Object.values(BaseColors).map((color) => (
        <Metric key={color} color={color} {...args} />
      ))}
    </>
  ),
  args: { children: "USD 80.000" },
};
