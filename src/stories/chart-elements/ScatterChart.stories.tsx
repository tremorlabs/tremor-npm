import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card, ScatterChart, Title } from "components";
import { simpleBaseChartDataRefactored as data, simpleBaseChartDataGithub } from "./helpers/testDataScatterChart";
import { valueFormatter } from "stories/chart-elements/helpers/utils";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/ChartElements/ScatterChart",
  component: ScatterChart,
} as ComponentMeta<typeof ScatterChart>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof ScatterChart> = (args) => (
  <>
    <Title>Mobile</Title>
    <div className="w-64">
      <Card>
        <ScatterChart {...args} />
      </Card>
    </div>
    <Title className="mt-5">Desktop</Title>
    <Card>
      <ScatterChart {...args} />
    </Card>
  </>
);

const DefaultTemplate: ComponentStory<typeof ScatterChart> = ({ ...args }) => (
  <Card>
    <ScatterChart {...args} />
  </Card>
);

const args = { x: "x", y: "y", size: "z", category: "location" };

export const DefaultResponsive = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultResponsive.args = {
  ...args,
  data,
};

export const WithNoSize = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithNoSize.args = {
  ...args,
  data,
  size: undefined
};

export const WithCustomeSizeRange = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomeSizeRange.args = {
  ...args,
  data,
  sizeRange: [1, 10]
};

export const WithCustomColor = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomColor.args = {
  ...args,
  data,
  colors: ["red", "green", "blue"],
};

export const WithCustomTooltip = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomTooltip.args = {
  ...args,
  data,
  tooltip: ["x", "z"],
};

export const WithCustomValueFormatters = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomValueFormatters.args = {
  ...args,
  data,
  valueFormatters: [(x) => `${x} cm`, (x) => `${x} yrs.`, valueFormatter]
};

export const WithAutoMinXValue = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithAutoMinXValue.args = {
  ...args,
  data,
  autoMinXValue: true
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

export const WithGithubExampleDatas = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithGithubExampleDatas.args = {
    data: simpleBaseChartDataGithub,
    x: "gdpPercap",
    y: "lifeExp",
    category: "continent",
    size: "population",
    tooltip: ["country", "happinessLev"],
    colors: ["red", "green", "blue"],
};