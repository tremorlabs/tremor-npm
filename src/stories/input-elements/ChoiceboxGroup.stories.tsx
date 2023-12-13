import type { Meta, StoryObj } from "@storybook/react";
import { ChoiceboxGroup } from "components";
import { SimpleChoiceboxGroupControlled } from "./helpers/SimpleChoiceboxGroup";

const meta: Meta<typeof ChoiceboxGroup> = {
  title: "Components/Input/ChoiceboxGroup",
  component: ChoiceboxGroup,
};

export default meta;
type Story = StoryObj<typeof ChoiceboxGroup>;

export const Default: Story = {
  render: SimpleChoiceboxGroupControlled,
};

export const Controlled: Story = {
  render: SimpleChoiceboxGroupControlled,
};
