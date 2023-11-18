import type { Meta, StoryObj } from "@storybook/react";

import { CalendarIcon } from "assets";
import { TextInput } from "components";
import { SimpleTextInput } from "./helpers/SimpleTextInput";

const meta: Meta<typeof TextInput> = {
  title: "UI/Input/TextInput",
  component: TextInput,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/input-elements/TextInput",
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {},
};

export const DefaultSet: Story = {
  render: SimpleTextInput,
  args: {},
};

export const WithIcon: Story = {
  render: SimpleTextInput,
  args: {
    icon: CalendarIcon,
  },
};

export const WithNoPlaceholder: Story = {
  render: SimpleTextInput,
  args: {
    placeholder: "",
  },
};

export const WithDefaultValue: Story = {
  render: SimpleTextInput,
  args: {
    value: "Hello",
  },
};

export const WithError: Story = {
  render: SimpleTextInput,
  args: {
    value: "Hello",
    error: true,
  },
};

export const WithErrorMessage: Story = {
  render: SimpleTextInput,
  args: {
    value: "Hello",
    error: true,
    errorMessage: "Something is wrong",
  },
};

export const WithDisabled: Story = {
  render: SimpleTextInput,
  args: {
    value: "Hello",
    disabled: true,
  },
};

export const WithDisabledAndError: Story = {
  render: SimpleTextInput,
  args: {
    value: "Hello",
    error: true,
    disabled: true,
  },
};

export const WithTypePassword: Story = {
  render: SimpleTextInput,
  args: {
    type: "password",
  },
};

export const WithTypeEmail: Story = {
  render: SimpleTextInput,
  args: {
    type: "email",
  },
};

export const WithTypeUrl: Story = {
  render: SimpleTextInput,
  args: {
    type: "url",
  },
};
