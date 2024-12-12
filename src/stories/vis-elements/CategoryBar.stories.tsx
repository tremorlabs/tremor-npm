import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { CategoryBar } from "components";

const meta: Meta<typeof CategoryBar> = {
  title: "Visualizations/Vis/CategoryBar",
  component: CategoryBar,
  render: (args) => <CategoryBar {...args} />,
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

export const WithValuesMoreThan100: Story = {
  args: {
    values: [400, 400, 800],
    colors: ["emerald", "yellow", "orange", "rose"],
    markerValue: 1400,
    tooltip: "90%",
    className: "mt-5",
  },
};

export const WithValuesLessThan100: Story = {
  args: {
    values: [8, 7, 9, 8],
    colors: ["emerald", "yellow", "orange", "rose"],
    markerValue: 20,
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
