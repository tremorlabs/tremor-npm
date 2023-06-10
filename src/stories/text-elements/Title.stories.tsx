import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Title, Card } from "components";

const meta: Meta<typeof Title> = {
  title: "Tremor/TextElements/Title",
  component: Title,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof Title>;

const TitleResponsiveFlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <Card>
        <Title {...args}>Title</Title>
      </Card>
    );
  },
};

export const DefaultExample: Story = {
  ...TitleResponsiveFlexTemplate,
};

export const ExampleColor: Story = {
  ...TitleResponsiveFlexTemplate,
  args: {
    color: "green",
    className: "text-left",
    children: null,
  },
};
