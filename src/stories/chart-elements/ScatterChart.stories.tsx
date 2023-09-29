import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card, ScatterChart, Title } from "components";
import {
  simpleScatterChartData as data,
  simpleScatterChartData2 as data2,
} from "./helpers/testDataScatterChart";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/ChartElements/ScatterChart",
  component: ScatterChart,
} as ComponentMeta<typeof ScatterChart>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof ScatterChart> = (args) => {
  if (args.onValueChange?.length === 0) {
    args.onValueChange = undefined;
  }
  return (
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
};

const DefaultTemplate: ComponentStory<typeof ScatterChart> = ({ ...args }) => (
  <Card>
    <ScatterChart {...args} />
  </Card>
);

const args = { x: "x", y: "y", size: "z", category: "location" };

export const DefaultResponsive = ResponsiveTemplate.bind({});
DefaultResponsive.args = {
  ...args,
  data,
};

export const WithNoSize = ResponsiveTemplate.bind({});
WithNoSize.args = {
  ...args,
  data,
  size: undefined,
};

export const WithCustomeSizeRange = ResponsiveTemplate.bind({});
WithCustomeSizeRange.args = {
  ...args,
  data,
  sizeRange: [1, 10],
};

export const WithCustomColor = ResponsiveTemplate.bind({});
WithCustomColor.args = {
  ...args,
  data,
  colors: ["red", "green", "blue", "yellow"],
};

export const WithCustomValueFormatters = ResponsiveTemplate.bind({});
WithCustomValueFormatters.args = {
  ...args,
  data,
  valueFormatter: {
    x: (x) => `${x} m`,
    y: (y) => `${y} cm`,
    size: (size) => `${size} kg`,
  },
};

export const WithAutoMinXValue = ResponsiveTemplate.bind({});
WithAutoMinXValue.args = {
  ...args,
  data,
  autoMinXValue: true,
};

export const WithNoData = DefaultTemplate.bind({});
WithNoData.args = {
  ...args,
};

export const WithNoDataText = DefaultTemplate.bind({});
WithNoDataText.args = {
  ...args,
  noDataText: "No data, try again later.",
};

export const WithOnValueChange = ResponsiveTemplate.bind({});
WithOnValueChange.args = {
  ...args,
  data,
  onValueChange: (value) => alert(JSON.stringify(value)),
};

export const WithExampleDatas = ResponsiveTemplate.bind({});
WithExampleDatas.args = {
  data: data2,
  x: "gdpPercap",
  y: "lifeExp",
  category: "continent",
  size: "population",
  valueFormatter: {
    x: (x) => `${x} $`,
    y: (y) => `${y} yrs`,
  },
  colors: ["red", "green", "blue"],
};

export const WithoutLegendScroll = ResponsiveTemplate.bind({});
WithoutLegendScroll.args = {
  ...args,
  data,
  withScroll: false,
};
