import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RadarChart, Card, Title } from "components";
import { simpleBaseChartData as data } from "./helpers/testData";
import { valueFormatter } from "./helpers/utils";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/ChartElements/RadarChart",
  component: RadarChart,
} as ComponentMeta<typeof RadarChart>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof RadarChart> = (args) => (
  <>
    <Title>Mobile</Title>
    <div className="w-64">
      <Card>
        <RadarChart {...args} />
      </Card>
    </div>
    <Title className="mt-5">Desktop</Title>
    <Card>
      <RadarChart {...args} />
    </Card>
  </>
);

const DefaultTemplate: ComponentStory<typeof RadarChart> = ({ ...args }) => (
  <Card>
    <RadarChart {...args} />
  </Card>
);

const args = { categories: ["Sales", "Successful Payments"], index: "month" };

export const DefaultResponsive = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultResponsive.args = {
  ...args,
  data,
};

export const WithValueFormatter = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithValueFormatter.args = {
  ...args,
  data,
  valueFormatter: valueFormatter,
};

export const WithDashArray = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithDashArray.args = {
  ...args,
  data,
  dashArray: true
};

export const WithCustomOuterRadius = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomOuterRadius.args = {
  ...args,
  data,
  outerRadius: "30%",
};

export const WithCustomColors = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomColors.args = {
  ...args,
  data,
  colors: ["blue", "green"],
};

export const WithGradient = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithGradient.args = {
  ...args,
  data,
  showGradient: true,
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
  data,
  index: "month",
};

export const WithNoIndex = DefaultTemplate.bind({});
WithNoIndex.args = {
  data,
  categories: ["Sales", "Successful Payments"],
};

export const WithNoAnimation = DefaultTemplate.bind({});
WithNoAnimation.args = {
  ...args,
  data,
  showAnimation: false
};

export const WithLongAnimationDuration = DefaultTemplate.bind({});
WithLongAnimationDuration.args = {
  ...args,
  data,
  animationDuration: 5000,
};

export const WithShortAnimationDuration = DefaultTemplate.bind({});
WithShortAnimationDuration.args = {
  ...args,
  data,
  animationDuration: 100,
};
