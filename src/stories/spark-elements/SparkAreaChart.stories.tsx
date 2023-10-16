import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { simpleBaseChartData as data } from "../chart-elements/helpers/testData";
import { SparkAreaChart } from "components/spark-elements";
import ExampleCard from "./helpers/ExampleCard";

const meta: Meta<typeof SparkAreaChart> = {
  title: "Components/Chart/SparkAreaChart",
  component: SparkAreaChart,
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
type Story = StoryObj<typeof SparkAreaChart>;

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
