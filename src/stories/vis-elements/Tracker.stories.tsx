import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Card, Tracker } from "components";
import { TrackerBlockProps } from "components/vis-elements/Tracker/Tracker";

const data: TrackerBlockProps[] = [
  { color: "emerald", tooltip: "Tracker Info asjdfh sk as df sdjfhksadfhjjh asdjfhsk fsk" },
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
  { color: "emerald", tooltip: "Tracker Info  asjdfh sk as df sdjfhksadfhjjh asdjfhsk fsk" },
  { color: "yellow", tooltip: "Tracker Info" },
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

export const Default: Story = {};

export const MaxWidthMd: Story = {
  render: () => (
    <Card className="max-w-md">
      <Tracker data={data.slice(60, 90)} className="mt-3" />
    </Card>
  ),
};

export const MaxWidthXs: Story = {
  render: () => (
    <Card className="max-w-xs">
      <Tracker data={data.slice(60, 90)} className="mt-3" />
    </Card>
  ),
};

export const CustomColors: Story = {
  args: {
    data: [
      { color: "#32a852", tooltip: "Tracker Info" },
      { color: "#fcba03", tooltip: "Tracker Info" },
      { color: "orange-500", tooltip: "Tracker Info" },
      { color: "purple-100", tooltip: "Tracker Info" },
      { color: "purple-300", tooltip: "Tracker Info" },
      { color: "purple-500", tooltip: "Tracker Info" },
      { color: "purple-700", tooltip: "Tracker Info" },
      { color: "purple-900", tooltip: "Tracker Info" },
    ],
  },
};
