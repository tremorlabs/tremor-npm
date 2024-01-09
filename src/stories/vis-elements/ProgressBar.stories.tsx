import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { ProgressBar } from "components";

import { BaseColors } from "lib/constants";

const meta: Meta<typeof ProgressBar> = {
  title: "Visualizations/Vis/ProgressBar",
  component: ProgressBar,
  render: (args) => <ProgressBar {...args} />,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/vis-elements/ProgressBar",
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 50,
    tooltip: "50%",
    label: "90%",
  },
};

export const Value0: Story = {
  args: {
    value: 0,
  },
};

export const Colors: Story = {
  render: (args) => (
    <div>
      {Object.values(BaseColors).map((color) => (
        <ProgressBar key={color} {...args} color={color} className="mt-8" />
      ))}
    </div>
  ),
  args: {
    value: 50,
    tooltip: "50%",
  },
};
