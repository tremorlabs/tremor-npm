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

export const DefaultResponsive = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultResponsive.args = {
  data: [
    {
      month: "Jan 21'",
      Sales: 3,
    },
    {
      month: "Feb 21'",
      Sales: 1,
    },
    {
      month: "Mar 21'",
      Sales: 2,
    },
  ],
  categories: ["Sales", "Successful Payments"],
  index: "month",
};

export const WithStacked = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithStacked.args = {
  data: data,
  categories: ["Sales", "Successful Payments"],
  index: "month",
  stack: true,
};

export const WithValueFormatter = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithValueFormatter.args = {
  data: data,
  categories: ["Sales", "Successful Payments"],
  index: "month",
  valueFormatter: valueFormatter,
  colors: ["red", "green"],
};

export const WithAutoMinValue = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithAutoMinValue.args = {
  data: data,
  categories: ["Sales", "Successful Payments"],
  index: "month",
  autoMinValue: true,
};

export const WithMinValueAndMaxValue = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithMinValueAndMaxValue.args = {
  data: data,
  categories: ["Sales", "Successfull Payments"],
  index: "month",
  minValue: -1000,
  maxValue: 4000,
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

export const WithCurveTypeNatural = DefaultTemplate.bind({});
WithCurveTypeNatural.args = {
  data: data,
  curveType: "natural",
  categories: ["Sales", "Successful Payments"],
};

export const WithConnectNullsTrue = DefaultTemplate.bind({});
WithConnectNullsTrue.args = {
  data: simpleBaseChartDataWithNulls,
  connectNulls: true,
  categories: ["Sales", "Successful Payments"],
};

export const WithConnectNullsFalse = DefaultTemplate.bind({});
WithConnectNullsFalse.args = {
  data: simpleBaseChartDataWithNulls,
  categories: ["Sales", "Successful Payments"],
};
