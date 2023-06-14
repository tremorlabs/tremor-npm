import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Card, Metric, MarkerBar } from "components";

import { BaseColors } from "lib/constants";

const meta: Meta<typeof MarkerBar> = {
  title: "Tremor/VisElements/MarkerBar",
  component: MarkerBar,
  decorators: [(Story) => <Story />],
  args: {
    value: 50,
    markerTooltip: "50%",
    className: "mt-5",
  },
};

export default meta;
type Story = StoryObj<typeof MarkerBar>;

const MarkerBarResponsiveFlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <Card className="mt-5">
          <Metric>$23.456</Metric>
          <MarkerBar {...args} />
        </Card>
        <Card className="mt-5">
          <Metric>$23.456</Metric>
          <MarkerBar value={50} minValue={25} maxValue={75} />
        </Card>
        {Object.values(BaseColors).map((color) => (
          <Card key={color} className="mt-5">
            <Metric>$23.456</Metric>
            <MarkerBar {...args} color={color} />
          </Card>
        ))}
      </>
    );
  },
};

export const DefaultExample: Story = {
  ...MarkerBarResponsiveFlexTemplate,
  args: {
    value: 50,
    minValue: 25,
    maxValue: 75,
    rangeTooltip: "Min: 25% Max: 75%",
    markerTooltip: "50%",
    className: "mt-5",
  },
};
