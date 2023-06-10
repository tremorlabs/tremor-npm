import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { ArrowUpRightIcon } from "assets";

import { Callout } from "components";

import { BaseColors } from "lib/constants";

const meta: Meta<typeof Callout> = {
  title: "Tremor/TextElements/Callout",
  component: Callout,
  decorators: [(Story) => <Story />],
  args: {
    title: "Performance Metric",
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor lorem non est congue blandit. Praesent non lorem sodales, suscipit est sed, hendrerit dolor.",
  },
};

export default meta;
type Story = StoryObj<typeof Callout>;

const CalloutResponsiveFlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <div className="space-y-5 max-w-lg">
        <Callout {...args} />
        {Object.values(BaseColors).map((color) => (
          <div key={color} className="">
            <Callout {...args} color={color} />
          </div>
        ))}
      </div>
    );
  },
};

export const DefaultExample: Story = {
  ...CalloutResponsiveFlexTemplate,
};

export const WithIconExample: Story = {
  ...CalloutResponsiveFlexTemplate,
  args: {
    icon: ArrowUpRightIcon,
  },
};
