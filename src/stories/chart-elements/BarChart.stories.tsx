import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BarChart, Card, Title } from "components";
import { simpleBaseChartData as data } from "./helpers/testData";
import { valueFormatter } from "stories/chart-elements/helpers/utils";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/ChartElements/BarChart",
  component: BarChart,
} as ComponentMeta<typeof BarChart>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof BarChart> = (args) => (
  <>
    <Title>Mobile</Title>
    <div className="w-64">
      <Card>
        <BarChart {...args} />
      </Card>
    </div>
    <Title className="mt-5">Desktop</Title>
    <Card>
      <BarChart {...args} />
    </Card>
  </>
);

const DefaultTemplate: ComponentStory<typeof BarChart> = ({ ...args }) => (
  <Card>
    <BarChart {...args} />
  </Card>
);

export const DefaultResponsive = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultResponsive.args = {
  data: data,
  categories: ["Sales", "Successful Payments"],
  index: "month",
};

export const WithStacked = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithStacked.args = {
  data: data,
  stack: true,
  categories: ["Sales", "Successful Payments"],
  index: "month",
};

export const WithRelative = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithRelative.args = {
  data: data,
  relative: true,
  categories: ["Sales", "Successful Payments"],
  index: "month",
};

export const WithLayoutVertical = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLayoutVertical.args = {
  data: data,
  layout: "vertical",
  categories: ["Sales", "Successful Payments"],
  index: "month",
};

export const WithAutoMinValue = ResponsiveTemplate.bind({});
WithAutoMinValue.args = {
  data: data,
  categories: ["Sales", "Successful Payments"],
  index: "month",
  autoMinValue: true,
};

export const WithAutoMinValueAndLayoutVertical = ResponsiveTemplate.bind({});
WithAutoMinValueAndLayoutVertical.args = {
  data: data,
  categories: ["Sales", "Successful Payments"],
  index: "month",
  layout: "vertical",
  autoMinValue: true,
};

export const WithMinValueAndMaxValue = ResponsiveTemplate.bind({});
WithMinValueAndMaxValue.args = {
  data: data,
  categories: ["Sales", "Successfull Payments"],
  index: "month",
  minValue: -1000,
  maxValue: 5000,
};

export const WithValueFormatter = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithValueFormatter.args = {
  data: data,
  categories: ["Sales", "Successful Payments"],
  index: "month",
  valueFormatter: valueFormatter,
  colors: ["blue", "green"],
};

export const WithCustomColors = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomColors.args = {
  data: data,
  categories: ["Sales", "Successful Payments"],
  index: "month",
  colors: ["blue", "green"],
};

export const WithNoGradient = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithNoGradient.args = {
  data: data,
  categories: ["Sales", "Successful Payments"],
  index: "month",
  showGradient: false,
};

export const WithChangedCategoriesOrder = DefaultTemplate.bind({});
WithChangedCategoriesOrder.args = {
  data: data,
  categories: ["Successful Payments", "Sales"],
  index: "month",
};

export const WithLessColorsThanCategories = DefaultTemplate.bind({});
WithLessColorsThanCategories.args = {
  data: data,
  categories: ["Sales", "Successful Payments"],
  index: "month",
  colors: ["green"],
};

export const WithLongValues = ResponsiveTemplate.bind({});
WithLongValues.args = {
  data: data,
  categories: ["This is an edge case"],
  index: "month",
  valueFormatter: valueFormatter,
};

export const WithMultipleCategories = ResponsiveTemplate.bind({});
WithMultipleCategories.args = {
  data: data,
  categories: ["Sales", "Successful Payments", "This is an edge case", "Test"],
  index: "month",
  valueFormatter: valueFormatter,
};

export const WithNoData = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithNoData.args = {
  categories: ["Sales", "Successful Payments"],
  index: "month",
};

export const WithNoDataText = DefaultTemplate.bind({});
WithNoDataText.args = {
  categories: ["Sales", "Successful Payments"],
  index: "month",
  noDataText: "No data, try again later.",
};

export const WithNoCategories = DefaultTemplate.bind({});
WithNoCategories.args = {
  data: data,
  index: "month",
};

export const WithNoDataKey = DefaultTemplate.bind({});
WithNoDataKey.args = {
  data: data,
  categories: ["Sales", "Successful Payments"],
};
