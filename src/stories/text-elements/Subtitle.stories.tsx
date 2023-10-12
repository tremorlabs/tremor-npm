import type { Meta, StoryObj } from "@storybook/react";

import Subtitle from "components/text-elements/Subtitle/Subtitle";

const meta: Meta<typeof Subtitle> = {
  title: "Components/Text/Subtitle",
  component: Subtitle,
};

export default meta;
type Story = StoryObj<typeof Subtitle>;

export const Default: Story = {
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor lorem non est congue blandit. Praesent non lorem sodales, suscipit est sed, hendrerit dolor.",
  },
};

export const Color: Story = {
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor lorem non est congue blandit. Praesent non lorem sodales, suscipit est sed, hendrerit dolor.",
    color: "green",
    className: "text-left",
  },
};
