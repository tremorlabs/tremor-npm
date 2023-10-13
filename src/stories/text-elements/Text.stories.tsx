import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "components";

const meta: Meta<typeof Text> = {
  title: "Components/Text/Text",
  component: Text,
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor lorem non est congue blandit. Praesent non lorem sodales, suscipit est sed, hendrerit dolor.",
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {},
};

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

export const TextJustify: Story = {
  args: {
    className: "text-justify",
  },
};

export const Color: Story = {
  args: {
    color: "green",
  },
};
