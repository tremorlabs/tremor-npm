import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { DeltaBar } from "components";

const meta: Meta<typeof DeltaBar> = {
  title: "Visualizations/Vis/DeltaBar",
  component: DeltaBar,
  render: (args) => <DeltaBar {...args} />,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/vis-elements/DeltaBar",
  },
};

export default meta;
type Story = StoryObj<typeof DeltaBar>;

export const Increase: Story = {
  args: {
    value: 30,
    className: "mt-5",
    tooltip: "30%",
  },
};

export const Decrease: Story = {
  args: {
    value: -50,
    className: "mt-5",
    tooltip: "-50%",
  },
};

export const IncreaseReversed: Story = {
  args: {
    value: 50,
    isIncreasePositive: false,
    className: "mt-5",
  },
};
