import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Card, Metric, DeltaBar } from "components";

const meta: Meta<typeof DeltaBar> = {
  title: "Tremor/VisElements/DeltaBar",
  component: DeltaBar,
  decorators: [(Story) => <Story />],
  args: {
    value: 50,
    tooltip: "50%",
    className: "mt-5",
  },
};

export default meta;
type Story = StoryObj<typeof DeltaBar>;

const DeltaBarResponsiveFlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <Card>
        <Metric>72.000 USD</Metric>
        <DeltaBar {...args} />
      </Card>
    );
  },
};

export const DefaultExample: Story = {
  ...DeltaBarResponsiveFlexTemplate,
};

export const IncreaseExample: Story = {
  ...DeltaBarResponsiveFlexTemplate,
  args: {
    value: 30,
    className: "mt-5",
    tooltip: "30%",
  },
};

export const DecreaseExample: Story = {
  ...DeltaBarResponsiveFlexTemplate,
  args: {
    value: -50,
    className: "mt-5",
    tooltip: "-50%",
  },
};

export const InversedExample: Story = {
  ...DeltaBarResponsiveFlexTemplate,
  args: {
    value: 50,
    isIncreasePositive: false,
    className: "mt-5",
  },
};
