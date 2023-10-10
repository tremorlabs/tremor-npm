import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card, ScatterChart, Title } from "components";
import {
  simpleScatterChartData as data,
  simpleScatterChartData2 as data2,
} from "./helpers/testDataScatterChart";
import { Color } from "lib";
import { CustomTooltipType } from "components/chart-elements/common/CustomTooltipProps";

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
      <Title>Desktop</Title>
      <Card>
        <ScatterChart {...args} />
      </Card>
      <Title className="mt-5">Mobile</Title>
      <div className="w-64">
        <Card>
          <ScatterChart {...args} />
        </Card>
      </div>
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
  size: undefined,
};

export const WithCustomeSizeRange = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomeSizeRange.args = {
  ...args,
  data,
  sizeRange: [1, 10],
};

export const WithCustomColor = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomColor.args = {
  ...args,
  data,
  colors: ["red", "green", "blue", "yellow"],
};

export const WithCustomValueFormatters = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
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
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithAutoMinXValue.args = {
  ...args,
  data,
  autoMinXValue: true,
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

export const WithOnValueChange = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithOnValueChange.args = {
  ...args,
  data,
  onValueChange: (value) => alert(JSON.stringify(value)),
};

export const WithExampleData = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithExampleData.args = {
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

//Custom tooltips
const customTooltipColors: Color[] = ["red", "green", "blue", "yellow"];
const customTooltipIndex = "location";
export const WithCustomTooltipExample1 = DefaultTemplate.bind({});
WithCustomTooltipExample1.args = {
  ...args,
  data,
  colors: customTooltipColors,
  category: customTooltipIndex,
  customTooltip: (props: CustomTooltipType) => {
    const { payload, active, label } = props;
    if (!active || !payload) return null;

    return (
      <div className="w-48 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
        <div className="flex flex-1 space-x-2.5">
          <div className={`w-1.5 flex flex-col bg-${payload?.[0]?.color}-500 rounded`} />
          <div className="w-full">
            <p className="mb-2 font-medium text-tremor-content-emphasis">{label}</p>
            {payload.map((payloadItem: any, index: number) => (
              <div key={index} className="flex items-center justify-between space-x-8">
                <p className="text-right text-tremor-content whitespace-nowrap">
                  {payloadItem.name}
                </p>
                <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
                  {payloadItem.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
