import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Legend, Card } from "components";

const meta: Meta<typeof Legend> = {
  title: "Tremor/TextElements/Legend",
  component: Legend,
  args: {
    categories: [
      "Critical",
      "This is a very long category name to test an edge case",
      "Category C",
      "Category D",
    ],
  },
  decorators: [
    (Story) => (
      <Card className="max-w-md">
        <Story />
      </Card>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Legend>;

export const DefaultExample: Story = {};
