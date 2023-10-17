import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "components";
import { SimpleSwitch } from "./helpers/SimpleSwitch";

const meta: Meta<typeof Switch> = {
  title: "Components/Input/Switch",
  component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CustomColor: Story = {
  args: {
    color: "emerald",
  },
};

export const Controlled: Story = {
  render: SimpleSwitch,
};

export const Required: Story = {
  render: SimpleSwitch,
  args: {
    required: true,
  },
};

export const Error: Story = {
  args: {
    error: true,
    errorMessage: "Something is wrong",
  },
};
