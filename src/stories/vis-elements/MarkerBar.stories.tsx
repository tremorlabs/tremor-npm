import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import MarkerBar from "components/vis-elements/MarkerBar/MarkerBar";
import { BaseColors } from "lib/constants";

const meta: Meta<typeof MarkerBar> = {
  title: "Visualizations/Vis/MarkerBar",
  component: MarkerBar,
  render: (args) => <MarkerBar {...args} />,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/vis-elements/MarkerBar",
  },
};

export default meta;
type Story = StoryObj<typeof MarkerBar>;

export const Default: Story = {
  args: {
    value: 50,
    markerTooltip: "50%",
  },
};

export const Range: Story = {
  args: {
    value: 50,
    minValue: 25,
    maxValue: 75,
    rangeTooltip: "Min: 25% Max: 75%",
    markerTooltip: "50%",
  },
};

export const MinValue0: Story = {
  args: {
    value: 0,
    minValue: 0,
    maxValue: 60,
  },
};

export const Colors: Story = {
  render: (args) => (
    <>
      {Object.values(BaseColors).map((color) => (
        <div key={color} className="mt-8">
          <MarkerBar {...args} color={color} />
        </div>
      ))}
    </>
  ),
  args: {
    value: 10,
    minValue: 0,
    maxValue: 60,
    showAnimation: true,
  },
};
