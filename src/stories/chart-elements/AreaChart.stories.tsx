import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AreaChart, Card, Title } from "components";
import { simpleBaseChartData as data, simpleBaseChartDataWithNulls } from "./helpers/testData";
import { valueFormatter } from "./helpers/utils";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/ChartElements/AreaChart",
  component: AreaChart,
} as ComponentMeta<typeof AreaChart>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof AreaChart> = (args) => (
  <>
    <Title>Mobile</Title>
    <div className="w-64">
      <Card>
        <AreaChart {...args} />
      </Card>
    </div>
    <Title className="mt-5">Desktop</Title>
    <Card>
      <AreaChart {...args} />
    </Card>
  </>
);

const DefaultTemplate: ComponentStory<typeof AreaChart> = ({ ...args }) => (
  <Card>
    <AreaChart {...args} />
  </Card>
);

const args = { categories: ["Sales", "Successful Payments"], index: "month" };

export const DefaultResponsive = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultResponsive.args = {
  ...args,
  data,
};

export const WithStacked = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithStacked.args = {
  ...args,
  data,
  stack: true,
};

export const WithValueFormatter = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithValueFormatter.args = {
  ...args,
  data,
  valueFormatter: valueFormatter,
  colors: ["red", "green"],
};

export const WithAutoMinValue = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithAutoMinValue.args = {
  ...args,
  data,
  autoMinValue: true,
};

export const WithMinValueAndMaxValue = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithMinValueAndMaxValue.args = {
  ...args,
  data,
  minValue: -1000,
  maxValue: 4000,
};

export const WithCustomColors = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomColors.args = {
  ...args,
  data,
  colors: ["blue", "green"],
};

export const WithNoGradient = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithNoGradient.args = {
  ...args,
  data,
  showGradient: false,
};

export const WithChangedCategoriesOrder = DefaultTemplate.bind({});
WithChangedCategoriesOrder.args = {
  ...args,
  data,
};

export const WithLessColorsThanCategories = DefaultTemplate.bind({});
WithLessColorsThanCategories.args = {
  ...args,
  data,
  colors: ["green"],
};

export const WithLongValues = ResponsiveTemplate.bind({});
WithLongValues.args = {
  ...args,
  data,
  categories: ["This is an edge case"],
  valueFormatter: valueFormatter,
};

export const WithMultipleCategories = ResponsiveTemplate.bind({});
WithMultipleCategories.args = {
  ...args,
  data,
  categories: ["Sales", "Successful Payments", "This is an edge case", "Test"],
  valueFormatter: valueFormatter,
};

export const WithNoData = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithNoData.args = {
  ...args,
};

export const WithNoDataText = DefaultTemplate.bind({});
WithNoDataText.args = {
  ...args,
  noDataText: "No data, try again later.",
};

export const WithNoCategories = DefaultTemplate.bind({});
WithNoCategories.args = {
  ...args,
  data,
  index: "month",
};

export const WithNoDataKey = DefaultTemplate.bind({});
WithNoDataKey.args = {
  ...args,
  data,
};

export const WithCurveTypeNatural = DefaultTemplate.bind({});
WithCurveTypeNatural.args = {
  ...args,
  data,
  curveType: "natural",
};

export const WithConnectNullsTrue = DefaultTemplate.bind({});
WithConnectNullsTrue.args = {
  ...args,
  data: simpleBaseChartDataWithNulls,
  connectNulls: true,
};

export const WithConnectNullsFalse = DefaultTemplate.bind({});
WithConnectNullsFalse.args = {
  ...args,
  data: simpleBaseChartDataWithNulls,
};

export const WithNoAnimation = DefaultTemplate.bind({});
WithNoAnimation.args = {
  data: data,
  showAnimation: false,
  categories: ["Sales", "Successful Payments"],
  index: "month",
};

export const WithDefaultAnimationDuration = DefaultTemplate.bind({});
WithDefaultAnimationDuration.args = {
  data: data,
  showAnimation: true,
  categories: ["Sales", "Successful Payments"],
  index: "month",
};

export const WithLongAnimationDuration = DefaultTemplate.bind({});
WithLongAnimationDuration.args = {
  data: data,
  showAnimation: true,
  animationDuration: 5000,
  categories: ["Sales", "Successful Payments"],
  index: "month",
};

export const WithShortAnimationDuration = DefaultTemplate.bind({});
WithShortAnimationDuration.args = {
  data: data,
  showAnimation: true,
  animationDuration: 100,
  categories: ["Sales", "Successful Payments"],
  index: "month",
};
