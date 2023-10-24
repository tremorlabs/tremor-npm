import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "components";

const meta: Meta<typeof Textarea> = {
  title: "Components/Input/Textarea",
  component: Textarea,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor lorem non est congue blandit. Praesent non lorem sodales, suscipit est sed, hendrerit dolor.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: "This is some placeholdertext",
  },
};

export const Error: Story = {
  args: {
    error: true,
  },
};

export const ErrorMessage: Story = {
  args: {
    error: true,
    errorMessage: "An unkown error occured.",
  },
};
