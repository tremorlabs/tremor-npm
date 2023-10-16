import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { simpleBaseChartData as data } from "../chart-elements/helpers/testData";
import { SparkBarChart } from "components/spark-elements";
import ExampleCard from "./helpers/ExampleCard";

const meta: Meta<typeof SparkBarChart> = {
  title: "Components/Chart/SparkBarChart",
  component: SparkBarChart,
  args: {
    categories: ["Sales"],
    index: "month",
    data,
    className: "h-12 w-28",
    colors: ["emerald"],
  },
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof SparkBarChart>;

export const Default: Story = {
  args: {},
};

export const WithCard: Story = {
  args: {
    referenceLine: 3000,
  },
  decorators: [
    (Story) => (
      <ExampleCard>
        <Story />
      </ExampleCard>
    ),
  ],
};
