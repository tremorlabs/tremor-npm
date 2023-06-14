import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Card, Metric, CategoryBar } from "components";

const meta: Meta<typeof CategoryBar> = {
  title: "Tremor/VisElements/CategoryBar",
  component: CategoryBar,
  decorators: [(Story) => <Story />],
  args: {
    tooltip: "50%",
    className: "mt-5",
  },
};

export default meta;
type Story = StoryObj<typeof CategoryBar>;

const CategoryBarResponsiveFlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <Card>
        <Metric>$23.456</Metric>
        <CategoryBar {...args} />
      </Card>
    );
  },
};

export const DefaultExample: Story = {
  ...CategoryBarResponsiveFlexTemplate,
  args: {
    values: [60, 10, 20, 10],
  },
};

export const WithMarkerExample: Story = {
  ...CategoryBarResponsiveFlexTemplate,
  args: {
    values: [20, 15, 45, 20],
    colors: ["emerald", "yellow", "orange", "rose"],
    markerValue: 50,
    tooltip: "90%",
  },
};

export const WithMarkerOnLabelExample: Story = {
  ...CategoryBarResponsiveFlexTemplate,
  args: {
    values: [0, 50, 50],
    colors: ["emerald", "yellow", "orange", "rose"],
    markerValue: 50,
    tooltip: "90%",
  },
};

export const WithSmallStartValue: Story = {
  ...CategoryBarResponsiveFlexTemplate,
  args: {
    values: [10, 25, 45, 20],
    colors: ["emerald", "yellow", "orange", "rose"],
    markerValue: 50,
    tooltip: "90%",
  },
};

export const WithCloseEndValue: Story = {
  ...CategoryBarResponsiveFlexTemplate,
  args: {
    values: [10, 25, 50, 15],
    colors: ["emerald", "yellow", "orange", "rose"],
    markerValue: 50,
    tooltip: "90%",
  },
};

export const WithZeroValues: Story = {
  ...CategoryBarResponsiveFlexTemplate,
  args: {
    values: [10, 25, 0, 50, 0, 15, 0],
    colors: ["emerald", "yellow", "orange", "rose"],
    markerValue: 50,
    tooltip: "90%",
  },
};

export const WithConsecutiveSmallValues: Story = {
  ...CategoryBarResponsiveFlexTemplate,
  args: {
    values: [10, 5, 5, 5, 5, 5, 50, 15, 0],
    markerValue: 50,
    tooltip: "90%",
  },
};

export const WithNoLabelsInbetween: Story = {
  ...CategoryBarResponsiveFlexTemplate,
  args: {
    values: [5, 95],
    markerValue: 50,
    tooltip: "90%",
  },
};

export const WithNoLabels: Story = {
  ...CategoryBarResponsiveFlexTemplate,
  args: {
    values: [5, 95],
    markerValue: 50,
    tooltip: "90%",
    showLabels: false,
  },
};
