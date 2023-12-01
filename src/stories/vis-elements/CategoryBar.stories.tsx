import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import CategoryBar from "components/vis-elements/CategoryBar/CategoryBar";

const meta: Meta<typeof CategoryBar> = {
  title: "Visualizations/Vis/CategoryBar",
  component: CategoryBar,
  render: (args) => <CategoryBar {...args} />,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/vis-elements/CategoryBar",
  },
};

export default meta;
type Story = StoryObj<typeof CategoryBar>;

export const Default: Story = {
  args: {
    values: [60, 10, 20, 10],
    className: "mt-5",
  },
};

export const WithMarker: Story = {
  args: {
    values: [20, 15, 45, 20],
    colors: ["emerald", "yellow", "orange", "rose"],
    markerValue: 50,
    tooltip: "90%",
    className: "mt-5",
  },
};

export const WithMarkerOnLabel: Story = {
  args: {
    values: [0, 50, 50],
    colors: ["emerald", "yellow", "orange", "rose"],
    markerValue: 50,
    tooltip: "90%",
    className: "mt-5",
  },
};

export const WithSmallStartValue: Story = {
  args: {
    values: [10, 25, 45, 20],
    colors: ["emerald", "yellow", "orange", "rose"],
    markerValue: 50,
    tooltip: "90%",
    className: "mt-5",
  },
};

export const WithCloseEndValue: Story = {
  args: {
    values: [10, 25, 50, 15],
    colors: ["emerald", "yellow", "orange", "rose"],
    markerValue: 50,
    tooltip: "90%",
    className: "mt-5",
  },
};

export const WithZeroValues: Story = {
  args: {
    values: [10, 25, 0, 50, 0, 15, 0],
    colors: ["emerald", "yellow", "orange", "rose"],
    markerValue: 50,
    tooltip: "90%",
    className: "mt-5",
  },
};

export const WithConsecutiveSmallValues: Story = {
  args: {
    values: [10, 5, 5, 5, 5, 5, 50, 15, 0],
    markerValue: 50,
    tooltip: "90%",
    className: "mt-5",
  },
};

export const WithNoLabelsInbetween: Story = {
  args: {
    values: [5, 95],
    markerValue: 50,
    tooltip: "90%",
    className: "mt-5",
  },
};

export const WithNoLabels: Story = {
  args: {
    values: [5, 95],
    markerValue: 50,
    tooltip: "90%",
    className: "mt-5",
    showLabels: false,
  },
};
