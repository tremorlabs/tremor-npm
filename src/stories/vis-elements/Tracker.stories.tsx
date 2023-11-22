import React from "react";

import { CheckCircleIcon } from "@heroicons/react/solid";

import type { Meta, StoryObj } from "@storybook/react";

import { Card, Tracker } from "components";

const data = [
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "red", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "red", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
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
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "yellow", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "red", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
  { color: "emerald", tooltip: "Tracker Info" },
];

const meta: Meta<typeof Tracker> = {
  title: "Visualizations/Vis/Tracker",
  component: Tracker,
  args: {
    data: data,
  },
  render: (args) => <Tracker {...args} />,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/vis-elements/Tracker",
  },
};

export default meta;
type Story = StoryObj<typeof Tracker>;

// export const Default: Story = {};

export const Default: Story = {
  render: (args) => (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CheckCircleIcon className="h-5 w-5 text-emerald-500" aria-hidden="true" />
          <p className="text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis font-medium">
            example.com
          </p>
        </div>
        <p className="text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis font-medium">
          98.1% uptime
        </p>
      </div>
      <Tracker {...args} className="mt-3" />
      <p className="mt-4 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Last 90 days
      </p>
    </Card>
  ),
};

export const MaxWidthMd: Story = {
  render: () => (
    <Card className="max-w-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CheckCircleIcon className="h-5 w-5 text-emerald-500" aria-hidden="true" />
          <p className="text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis font-medium">
            example.com
          </p>
        </div>
        <p className="text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis font-medium">
          98.1% uptime
        </p>
      </div>
      <Tracker data={data.slice(60, 90)} className="mt-3" />
      <p className="mt-3 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Last 30 days
      </p>
    </Card>
  ),
};

export const MaxWidthXs: Story = {
  render: () => (
    <Card className="max-w-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CheckCircleIcon className="h-5 w-5 text-emerald-500" aria-hidden="true" />
          <p className="text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis font-medium">
            example.com
          </p>
        </div>
        <p className="text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis font-medium">
          98.1% uptime
        </p>
      </div>
      <Tracker data={data.slice(60, 90)} className="mt-3" />
      <p className="mt-3 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Last 30 days
      </p>
    </Card>
  ),
};
