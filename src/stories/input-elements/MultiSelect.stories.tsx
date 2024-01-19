import type { Meta, StoryObj } from "@storybook/react";

import { MultiSelect } from "components";
import {
  SimpleMultiSelect,
  SimpleMultiSelectControlled,
  SimpleMultiSelectForm,
  SimpleMultiSelectWithStaticAndDynamicChildren,
} from "./helpers/SimpleMultiSelect";

import { CalendarIcon } from "assets";

const meta: Meta<typeof MultiSelect> = {
  title: "UI/Input/MultiSelect",
  component: MultiSelect,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/input-elements/MultiSelect",
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const UncontrolledDefault: Story = {
  render: SimpleMultiSelect,
  args: {},
};

export const UncontrolledDefaultWithStaticAndDynamicChildren: Story = {
  render: SimpleMultiSelectWithStaticAndDynamicChildren,
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

export const Error: Story = {
  render: SimpleMultiSelect,
  args: {
    error: true,
    errorMessage: "Error message",
  },
};

export const Form: Story = {
  render: SimpleMultiSelectForm,
  args: {
    required: true,
  },
};
