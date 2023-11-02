import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "components";
import { SimpleIdCheckbox } from "./helpers/SimpleCheckbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Input/Checkbox",
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
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

export const Id: Story = {
  render: SimpleIdCheckbox,
  args: {
    // required: true,
  },
};
