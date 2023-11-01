import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { Metric } from "components";
import { BaseColors } from "lib/constants";

const meta: Meta<typeof Metric> = {
  title: "Components/Text/Metric",
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
