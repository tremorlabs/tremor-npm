import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { Metric } from "components";
import { BaseColors } from "lib/constants";

const meta: Meta<typeof Metric> = {
  title: "UI/Text/Metric",
  component: Metric,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/text-elements/Metric",
  },
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
