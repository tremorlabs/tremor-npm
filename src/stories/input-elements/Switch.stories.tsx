import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "components";
import { SimpleSwitch, SimpleIdSwitch } from "./helpers/SimpleSwitch";

const meta: Meta<typeof Switch> = {
  title: "UI/Input/Switch",
  component: Switch,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/input-elements/Switch",
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Uncontrolled: Story = {
  args: {},
};

export const DefaultChecked: Story = {
  args: {
    defaultChecked: true,
  },
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

export const Id: Story = {
  render: SimpleIdSwitch,
  args: {
    required: true,
  },
};
