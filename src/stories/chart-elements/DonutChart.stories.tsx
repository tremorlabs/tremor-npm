import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { BadgeDelta, Card, DonutChart, Flex, List, ListItem, Title } from "components";
import { DeltaType } from "lib";

import { simpleSingleCategoryData as data } from "stories/chart-elements/helpers/testData";
import { valueFormatter } from "stories/chart-elements/helpers/utils";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DonutChart> = {
  title: "Tremor/ChartElements/DonutChart",
  component: DonutChart,
  args: { category: "sales", index: "city", data },
  decorators: [
    (Story) => (
      <>
        <Title className="mt-5">Desktop</Title>
        <Card>
          <Story />
        </Card>
        <Title>Mobile</Title>
        <div className="w-64">
          <Card>
            <Story />
          </Card>
        </div>
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DonutChart>;

export const DefaultResponsive: Story = {
  args: {},
};

export const WithValueFormatter: Story = {
  args: { valueFormatter: valueFormatter, colors: ["red", "green"] },
};

export const WithCustomLabel: Story = {
  args: { label: "Hello there" },
};

export const WithLabelDisabled: Story = {
  args: { label: "Hello there", showLabel: false },
};

export const WithCustomColors: Story = {
  args: { colors: ["blue", "amber", "sky", "emerald", "rose", "orange"] },
};

export const WithMoreDatapointsThanColors: Story = {
  args: {
    data: [
      // extra long data array
      ...data,
      ...data,
    ],
    colors: ["blue", "amber", "sky", "emerald", "rose", "orange"],
  },
};

export const WithLongValues: Story = {
  args: {
    data: data.map((dataPoint) => ({
      ...dataPoint,
      sales: dataPoint.sales * 10000000,
    })),
    valueFormatter: valueFormatter,
  },
};

export const WithVariantPie: Story = {
  args: { variant: "pie" },
};

export const WithNoData: Story = {
  args: { data: [] },
};

export const WithWithNoDataText: Story = {
  args: { data: [], noDataText: "No data, try again later." },
};

export const WithLessColorsThanCategories: Story = {
  args: { colors: ["green"] },
};

export const WithNoIndex: Story = {
  args: { index: undefined },
};

export const WithNoAnimation: Story = {
  args: { showAnimation: false },
};

export const WithDefaultAnimationDuration: Story = {
  args: {},
};

export const WithLongAnimationDuration: Story = {
  args: { animationDuration: 5000 },
};

export const WithShortAnimationDuration: Story = {
  args: { animationDuration: 100 },
};

export const BlockExample: Story = {
  decorators: [
    (Story) => (
      <>
        <Title>Base Layer (Beta)</Title>
        <div className="w-full mt-4">
          <Card>
            <Title>Sales</Title>
            <Story className="mt-5" />
            <div className="mt-6">
              <List>
                {data.map((item) => (
                  <ListItem key={item.city}>
                    <span> {item.city} </span>
                    <Flex className="space-x-2" justifyContent="end">
                      <BadgeDelta
                        deltaType={item.deltaType as DeltaType}
                        isIncreasePositive={true}
                        size="xs"
                      >
                        {item.delta}
                      </BadgeDelta>
                    </Flex>
                  </ListItem>
                ))}
              </List>
            </div>
          </Card>
        </div>
      </>
    ),
  ],
};
