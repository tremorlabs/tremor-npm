import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import {
  simpleBaseChartData as data,
  longBaseChartData,
  simpleBaseChartDataWithNulls,
  singleAndMultipleData,
} from "../chart-elements/helpers/testData";
import { SparkAreaChart } from "components/spark-elements";
import ExampleCard from "./helpers/ExampleCard";

const meta: Meta<typeof SparkAreaChart> = {
  title: "Visualizations/Chart/SparkAreaChart",
  component: SparkAreaChart,
  args: {
    categories: ["Sales", "Successful Payments"],
    index: "month",
    data,
    colors: ["emerald", "rose"],
  },
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/spark-elements/SparkAreaChart",
  },
};

export default meta;
type Story = StoryObj<typeof SparkAreaChart>;

export const Default: Story = { args: { categories: ["Sales"] } };

export const Stacked: Story = {
  args: {
    stack: true,
  },
};

export const OtherColors: Story = {
  args: { colors: ["rose", "purple"] },
};

export const NoGradient: Story = {
  args: { showGradient: false },
};

export const ChangedCategoriesOrder: Story = {
  args: { categories: ["Successful Payments", "Sales"] },
};

export const LessColorsThanCategories: Story = {
  args: { colors: ["green"] },
};

export const NoData: Story = {
  args: { data: [] },
};

export const NoDataText: Story = {
  args: { data: [], noDataText: "No data, try again later." },
};

export const NoCategories: Story = {
  args: { categories: undefined },
};

export const NoIndex: Story = {
  args: { index: undefined },
};

export const CurveTypeNatural: Story = {
  args: { curveType: "natural" },
};

export const ConnectNullsTrue: Story = {
  args: { data: simpleBaseChartDataWithNulls, connectNulls: true },
};

export const ConnectNullsFalse: Story = {
  args: { data: simpleBaseChartDataWithNulls, connectNulls: false },
};

export const Animation: Story = {
  args: { showAnimation: true },
};

export const LongAnimationDuration: Story = {
  args: { showAnimation: true, animationDuration: 5000 },
};

export const OneDataValue: Story = {
  args: { data: data.slice(0, 1) },
};

export const SingleAndMultipleData: Story = {
  args: { data: singleAndMultipleData },
};
export const LongDataInput: Story = {
  args: { data: longBaseChartData },
};

export const MultipleZeroValues: Story = {
  args: {
    data: [
      {
        month: "May 21",
        Sales: 2390,
        "Successful Payments": 0,
      },
      {
        month: "Jun 21",
        Sales: 2390,
        "Successful Payments": 0,
      },
      {
        month: "Jul 21",
        Sales: 3490,
        "Successful Payments": 0,
      },
    ],
  },
};

export const WithCard: Story = {
  args: {
    categories: ["Sales"],
  },
  decorators: [
    (Story) => (
      <ExampleCard>
        <Story />
      </ExampleCard>
    ),
  ],
};
