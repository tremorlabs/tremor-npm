import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Card, Metric, ProgressBar, Flex } from "components";

import { BaseColors } from "lib/constants";

const meta: Meta<typeof ProgressBar> = {
  title: "Tremor/VisElements/ProgressBar",
  component: ProgressBar,
  decorators: [(Story) => <Story />],
  args: {
    value: 50,
    tooltip: "50%",
    className: "mt-5",
    label: "90%",
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

const ProgressBarResponsiveFlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <Card className="mt-5 max-w-md">
          <Metric>$23.456</Metric>
          <Flex>
            <ProgressBar {...args} />
          </Flex>
        </Card>
        {Object.values(BaseColors).map((color) => (
          <Card key={color} className="mt-5 max-w-md">
            <Metric>$23.456</Metric>
            <Flex>
              <ProgressBar {...args} color={color} />
            </Flex>
          </Card>
        ))}
      </>
    );
  },
};

export const DefaultExample: Story = {
  ...ProgressBarResponsiveFlexTemplate,
};
