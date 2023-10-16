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
  render: SimpleSwitch,
  args: {},
};

export const Disabled: Story = {
  // render : SimpleSwitch,
  args: {
    disabled: true,
  },
};

export const CustomColor: Story = {
  // render : SimpleSwitch,
  args: {
    color: "slate",
  },
};

export const Required: Story = {
  render: SimpleSwitch,
  args: {
    required: true,
  },
};

export const Error: Story = {
  render: SimpleSwitch,
  args: {
    error: true,
    errorMessage: "Something is wrong",
  },
};
