import type { Meta, StoryObj } from "@storybook/react";
import { RadioButton } from "components";
import { SimpleRadioButton } from "./helpers/SimpleRadioButton";

const meta: Meta<typeof RadioButton> = {
  title: "UI/Input/RadioButton",
  component: RadioButton,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/input-elements/RadioButton",
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {};

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

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Controlled: Story = {
  render: SimpleRadioButton,
};
