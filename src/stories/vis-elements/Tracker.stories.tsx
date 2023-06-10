import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Card, Tracker } from "components";

const meta: Meta<typeof Tracker> = {
  title: "Tremor/VisElements/Tracker",
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
      { tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
      { color: "emerald", tooltip: "Tracker Info" },
    ],
  },
  decorators: [
    (Story) => (
      <>
        <Card>
          <Story />
        </Card>
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tracker>;

export const DefaultResponsive: Story = {
  args: {},
};
