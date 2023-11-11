import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "components";
import { SimpleSlider } from "./helpers/SimpleSlider";

const meta: Meta<typeof Slider> = {
  title: "Components/Input/Slider",
  component: Slider,
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Uncontrolled: Story = {
  args: {},
};

export const WithValue: Story = {
  args: {
    value: [50],
  },
};

export const Controlled: Story = {
  render: SimpleSlider,
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: [50],
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    disabled: true,
  },
};

export const WithRange: Story = {
  args: {
    defaultValue: [50, 75],
  },
};

export const CustomColor: Story = {
  args: {
    color: "emerald",
  },
};

export const WithStep: Story = {
  args: {
    step: 10,
  },
};

export const Vertical: Story = {
  render: SimpleSlider,
  args: {
    orientation: "vertical",
  },
};

export const Inverted: Story = {
  args: {
    inverted: true,
  },
};
