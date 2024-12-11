import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "components";
import { BaseColors } from "lib";
import React from "react";
import { SimpleIdSwitch, SimpleSwitch } from "./helpers/SimpleSwitch";

const meta: Meta<typeof Switch> = {
  title: "UI/Input/Switch",
  component: Switch,
};

const SwitchTemplateColors: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-2">
        {Object.values(BaseColors).map((color) => (
          <Switch checked key={color} color={color} />
        ))}
      </div>
    );
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

export const Colors: Story = {
  ...SwitchTemplateColors,
};
