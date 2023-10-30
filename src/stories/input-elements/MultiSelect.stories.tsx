import type { Meta, StoryObj } from "@storybook/react";

import { MultiSelect } from "components";
import { SimpleMultiSelect, SimpleMultiSelectControlled } from "./helpers/SimpleMultiSelect";

import { CalendarIcon } from "assets";

const meta: Meta<typeof MultiSelect> = {
  title: "Components/Input/MultiSelect",
  component: MultiSelect,
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const UncontrolledDefault: Story = {
  render: SimpleMultiSelect,
  args: {},
};

export const UncontrolledDefaultValues: Story = {
  render: SimpleMultiSelect,
  args: { defaultValue: ["5", "1"] },
};

export const UncontrolledIcon: Story = {
  render: SimpleMultiSelect,
  args: { icon: CalendarIcon, defaultValue: ["5", "1"] },
};

export const UncontrolledDisabled: Story = {
  render: SimpleMultiSelect,
  args: { icon: CalendarIcon, defaultValue: ["5", "1"], disabled: true },
};

export const Controlled: Story = {
  render: SimpleMultiSelectControlled,
  args: {},
};
