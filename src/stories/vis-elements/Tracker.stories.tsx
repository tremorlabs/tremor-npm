import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Tracker } from "components";

const meta: Meta<typeof Tracker> = {
  title: "Components/Vis/Tracker",
  component: Tracker,
  args: {
    data: [
      { color: "emerald", tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
      { color: "yellow", tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
      { color: "red", tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
      { color: "yellow", tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
      { color: "red", tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
      { color: "yellow", tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
      { tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
    ],
  },
  render: (args) => <Tracker {...args} />,
};

export default meta;
type Story = StoryObj<typeof Tracker>;

export const Default: Story = {};

export const MaxWidthMd: Story = {
  args: { className: "max-w-md" },
};

export const MaxWidthXs: Story = {
  args: { className: "max-w-xs" },
};
