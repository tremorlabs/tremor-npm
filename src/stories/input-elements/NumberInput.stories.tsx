import type { Meta, StoryObj } from "@storybook/react";

import { CalendarIcon } from "assets";
import { NumberInput } from "components";
import { SimpleNumberInput, SimpleNumberInputControlled } from "./helpers/SimpleNumberInput";

const meta: Meta<typeof NumberInput> = {
  title: "UI/Input/NumberInput",
  component: NumberInput,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/input-elements/NumberInput",
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: {},
};

export const DefaultSet: Story = {
  render: SimpleNumberInput,
  args: {},
};

export const Icon: Story = {
  render: SimpleNumberInput,
  args: {
    icon: CalendarIcon,
  },
};

export const NoPlaceholder: Story = {
  render: SimpleNumberInput,
  args: {
    placeholder: "",
  },
};

export const DefaultValue: Story = {
  render: SimpleNumberInput,
  args: {
    value: 123,
  },
};

export const StepProp: Story = {
  render: SimpleNumberInput,
  args: {
    step: ".1",
  },
};

export const StepPropNumber: Story = {
  render: SimpleNumberInput,
  args: {
    step: 0.1,
  },
};

export const MinMaxProp: Story = {
  render: SimpleNumberInput,
  args: {
    min: "2",
    max: "10",
  },
};

export const Error: Story = {
  render: SimpleNumberInput,
  args: {
    value: 123,
    error: true,
  },
};

export const ErrorMessage: Story = {
  render: SimpleNumberInput,
  args: {
    value: 123,
    error: true,
    errorMessage: "Something is wrong",
  },
};

export const Disabled: Story = {
  render: SimpleNumberInput,
  args: {
    value: 123,
    disabled: true,
  },
};

export const DisabledAndError: Story = {
  render: SimpleNumberInput,
  args: {
    value: 123,
    error: true,
    disabled: true,
  },
};

export const ControlledWithOnChange: Story = {
  render: SimpleNumberInputControlled,
  args: {},
};
