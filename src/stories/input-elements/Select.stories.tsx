import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "components";
import { SimpleSelect, SimpleSelect2, SimpleSelectControlled } from "./helpers/SimpleSelect";

import { CalendarIcon } from "assets";

const meta: Meta<typeof Select> = {
  title: "Components/Input/Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const UncontrolledDefault: Story = {
  render: SimpleSelect,
  args: {},
};

export const UncontrolledOnValueChange: Story = {
  render: SimpleSelect,
  args: { onValueChange: (v: string) => alert(v) },
};

export const UncontrolledEnableClear: Story = {
  render: SimpleSelect,
  args: { onValueChange: (v: string) => alert(v), enableClear: true },
};

export const UncontrolledDefaultValue: Story = {
  render: SimpleSelect,
  args: {
    defaultValue: "5",
  },
};

export const UncontrolledIcon: Story = {
  render: SimpleSelect,
  args: {
    defaultValue: "5",
    icon: CalendarIcon,
  },
};

export const UncontrolledWithIconAsReactElement: Story = {
  render: SimpleSelect,
  args: {
    defaultValue: "5",
    icon: <CalendarIcon />,
  },
};

export const UncontrolledWithIconAsReactElement2: Story = {
  render: SimpleSelect2,
  args: {
    defaultValue: "5",
    icon: <CalendarIcon />,
  },
};

export const UncontrolledDisabled: Story = {
  render: SimpleSelect,
  args: {
    icon: CalendarIcon,
    disabled: true,
  },
};

export const Controlled: Story = {
  render: SimpleSelectControlled,
};
