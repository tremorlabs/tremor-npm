import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Card, Text } from "components";

const meta: Meta<typeof Text> = {
  title: "Tremor/TextElements/Text",
  component: Text,
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor lorem non est congue blandit. Praesent non lorem sodales, suscipit est sed, hendrerit dolor.",
  },
  decorators: [
    (Story) => (
      <Card>
        <Story />
      </Card>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const DefaultExample: Story = {};

export const TextCenter: Story = {
  args: {
    className: "text-center",
  },
};

export const TextRight: Story = {
  args: {
    className: "text-right",
  },
};

export const TextLeft: Story = {
  args: {
    className: "text-left",
  },
};

export const TextJustify: Story = {
  args: {
    className: "text-justify",
  },
};

export const TextColor: Story = {
  args: {
    color: "green",
  },
};
