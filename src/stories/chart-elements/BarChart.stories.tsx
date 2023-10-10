import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BarChart, Card, Title } from "components";
import { simpleBaseChartData as data } from "./helpers/testData";
import { Color, currencyValueFormatter } from "lib";
import { CustomTooltipType } from "components/chart-elements/common/CustomTooltipProps";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/ChartElements/BarChart",
  component: BarChart,
} as ComponentMeta<typeof BarChart>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof BarChart> = (args) => {
  if (args.onValueChange?.length === 0) {
    args.onValueChange = undefined;
  }
  return (
    <>
      <Title>Desktop</Title>
      <Card>
        <BarChart {...args} yAxisWidth={60} />
      </Card>
      <Title className="mt-5">Mobile</Title>
      <div className="w-64">
        <Card>
          <BarChart {...args} yAxisWidth={60} />
        </Card>
      </div>
    </>
  );
};

const DefaultTemplate: ComponentStory<typeof BarChart> = ({ ...args }) => (
  <Card>
    <BarChart {...args} yAxisWidth={60} />
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

export const WithRelative = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithRelative.args = {
  ...args,
  data,
  relative: true,
};

export const WithLayoutVertical = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLayoutVertical.args = {
  ...args,
  data,
  layout: "vertical",
};

export const WithAutoMinValue = ResponsiveTemplate.bind({});
WithAutoMinValue.args = {
  ...args,
  data,
  autoMinValue: true,
};

export const WithAutoMinValueAndLayoutVertical = ResponsiveTemplate.bind({});
WithAutoMinValueAndLayoutVertical.args = {
  ...args,
  data,
  layout: "vertical",
  autoMinValue: true,
};

export const WithMinValueAndMaxValue = ResponsiveTemplate.bind({});
WithMinValueAndMaxValue.args = {
  ...args,
  data,
  minValue: -1000,
  maxValue: 5000,
};

export const WithValueFormatter = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithValueFormatter.args = {
  ...args,
  data,
  valueFormatter: currencyValueFormatter,
  colors: ["blue", "green"],
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
  data,
  categories: ["This is an edge case"],
  index: "month",
  valueFormatter: currencyValueFormatter,
};

export const WithMultipleCategories = ResponsiveTemplate.bind({});
WithMultipleCategories.args = {
  data,
  categories: ["Sales", "Successful Payments", "This is an edge case", "Test"],
  index: "month",
  valueFormatter: currencyValueFormatter,
};

export const WithNoData = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithNoData.args = args;

export const WithNoDataText = DefaultTemplate.bind({});
WithNoDataText.args = {
  ...args,
  noDataText: "No data, try again later.",
};

export const WithNoCategories = DefaultTemplate.bind({});
WithNoCategories.args = {
  ...args,
  data,
};

export const WithNoDataKey = DefaultTemplate.bind({});
WithNoDataKey.args = {
  ...args,
  data,
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

export const WithOnValueChange = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithOnValueChange.args = {
  ...args,
  data,
  stack: true,
  onValueChange: (value) => alert(JSON.stringify(value)),
};

//Custom tooltips
const customTooltipColors: Color[] = ["pink"];
const customTooltipIndex = "month";

export const WithCustomTooltipExample1 = DefaultTemplate.bind({});
WithCustomTooltipExample1.args = {
  ...args,
  data,
  index: customTooltipIndex,
  categories: ["Sales"],
  colors: customTooltipColors,
  valueFormatter: currencyValueFormatter,
  customTooltip: (props: CustomTooltipType) => {
    const { payload, active, label } = props;
    if (!active || !payload) return null;
    const categoryPayload = payload?.[0];
    if (!categoryPayload) return null;
    return (
      <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
        <div className="flex flex-1 space-x-2.5">
          <div className={`w-1.5 flex flex-col bg-${categoryPayload?.color}-500 rounded`} />
          <div className="w-full">
            <p className="font-medium text-tremor-content-emphasis">{label}</p>
            <div className="flex items-center justify-between space-x-8">
              <p className="text-right text-tremor-content whitespace-nowrap">
                {categoryPayload.dataKey}
              </p>
              <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
                {currencyValueFormatter(categoryPayload.value as number)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
