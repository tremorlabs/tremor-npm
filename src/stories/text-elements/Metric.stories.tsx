import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { BaseColors } from "lib/constants";
import { Metric } from "components";

const meta: Meta<typeof Metric> = {
  title: "Tremor/TextElements/Metric",
  component: Metric,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof Metric>;

const MetricResponsiveFlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <Metric>USD 70,000.00</Metric>
        {Object.values(BaseColors).map((color) => (
          <Metric key={color} color={color} {...args}>
            USD 70,000.00
          </Metric>
        ))}
      </>
    );
  },
};

export const DefaultExample: Story = {
  ...MetricResponsiveFlexTemplate,
};
