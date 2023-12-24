import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { ArrowUpRightIcon } from "assets";

import { Callout } from "components";
import { BaseColors } from "lib/constants";

const meta: Meta<typeof Callout> = {
  title: "UI/Text/Callout",
  component: Callout,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/text-elements/Callout",
  },
};

export default meta;
type Story = StoryObj<typeof Callout>;

const CalloutTemplate: Story = {
  render: ({ ...args }) => (
    <>
      <div className="mb-5 max-w-lg">
        <Callout {...args} className="mt-5" />
      </div>
      <div className="mb-5 max-w-lg">
        {Object.values(BaseColors).map((color) => (
          <div key={color} className="mb-5 max-w-lg">
            <Callout {...args} color={color} className="h-24 mt-5" />
          </div>
        ))}
      </div>
    </>
  ),
};

export const Default: Story = {
  args: {
    title: "Performance Metric",
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor lorem non est congue blandit. Praesent non lorem sodales, suscipit est sed, hendrerit dolor.",
  },
};

export const Colors: Story = {
  ...CalloutTemplate,
  args: {
    title: "Performance Metric",
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor lorem non est congue blandit. Praesent non lorem sodales, suscipit est sed, hendrerit dolor.",
  },
};

export const Icon: Story = {
  ...CalloutTemplate,
  args: {
    title: "Performance Metric",
    children:
      "You are outranking 83% of the sales representatives in your cohort. Sit repellendus qui ut at blanditis \
      et quo et molestiae. Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus \
      qui ut at blanditiis et quo et molestiae",
    icon: ArrowUpRightIcon,
  },
};
