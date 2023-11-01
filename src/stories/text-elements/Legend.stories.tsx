import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { Legend } from "components";

const meta: Meta<typeof Legend> = {
  title: "Components/Text/Legend",
  component: Legend,
  args: {
    categories: [
      "Critical",
      "This is a very long category name to test an edge case",
      "Category C",
      "Category D",
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Legend>;

// function
function LegendComponent(args: any) {
  // if (args.onClickLegendItem?.length === 0) {
  //   args.onClickLegendItem = undefined;
  // }
  return <Legend {...args} />;
}

const LegendTemplate: Story = {
  render: ({ ...args }) => <LegendComponent {...args} />,
};

export const Default: Story = {
  ...LegendTemplate,
};

export const OnClick: Story = {
  ...LegendTemplate,
  args: {
    onClickLegendItem: (e: any) => alert(JSON.stringify(e)),
  },
};

export const ActiveLegend: Story = {
  ...LegendTemplate,
  args: {
    activeLegend: "Category C",
  },
};
