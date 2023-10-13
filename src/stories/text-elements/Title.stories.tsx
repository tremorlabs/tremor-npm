import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Title } from "components";

const meta: Meta<typeof Title> = {
  title: "Components/Text/Title",
  component: Title,
};

export default meta;
type Story = StoryObj<typeof Title>;

export const Default: Story = {
  render: (args) => <Title {...args}>Title</Title>,
};

export const Color: Story = {
  render: (args) => <Title {...args}>Title</Title>,
  args: {
    color: "green",
    className: "text-left",
    children: null,
  },
};
