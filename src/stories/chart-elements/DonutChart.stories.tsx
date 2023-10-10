import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BadgeDelta, Card, DonutChart, Flex, List, ListItem, Title } from "components";
import { DeltaType } from "lib";

import {
  simpleSingleCategoryData as data,
  simpleBaseChartData as data2,
} from "stories/chart-elements/helpers/testData";
import { Color, currencyValueFormatter } from "lib";
import { CustomTooltipType } from "components/chart-elements/common/CustomTooltipProps";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/ChartElements/DonutChart",
  component: DonutChart,
} as ComponentMeta<typeof DonutChart>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof DonutChart> = (args) => {
  if (args.onValueChange?.length === 0) {
    args.onValueChange = undefined;
  }
  return (
    <>
      <Title>Desktop</Title>
      <Card>
        <DonutChart {...args} />
      </Card>
      <Title className="mt-5">Mobile</Title>
      <div className="w-64">
        <Card>
          <DonutChart {...args} />
        </Card>
      </div>
    </>
  );
};

const DefaultTemplate: ComponentStory<typeof DonutChart> = ({ ...args }) => {
  if (args.onValueChange?.length === 0) {
    args.onValueChange = undefined;
  }
  return (
    <Card>
      <DonutChart {...args} />
    </Card>
  );
};

const BlockTemplate: ComponentStory<typeof DonutChart> = (args) => {
  if (args.onValueChange?.length === 0) {
    args.onValueChange = undefined;
  }
  return (
    <>
      <Title>Base Layer (Beta)</Title>
      <div className="w-full mt-4">
        <Card>
          <Title>Sales</Title>
          <DonutChart className="mt-5" {...args} />
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
  );
};

const args = { category: "sales", index: "city" };

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
  valueFormatter: currencyValueFormatter,
};

export const WithCustomLabel = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomLabel.args = {
  ...args,
  data,
  valueFormatter: currencyValueFormatter,
  label: "Hello there",
};

export const WithLabelDisabled = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLabelDisabled.args = {
  ...args,
  data,
  valueFormatter: currencyValueFormatter,
  label: "Hello there",
  showLabel: false,
};

export const WithCustomColors = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomColors.args = {
  ...args,
  data,
  colors: ["blue", "amber", "sky", "emerald", "rose", "orange"],
};

export const WithMoreDatapointsThanColors = DefaultTemplate.bind({});
WithMoreDatapointsThanColors.args = {
  ...args,
  data: [
    // extra long data array
    ...data,
    ...data,
  ],
  colors: ["blue", "amber", "sky", "emerald", "rose", "orange"],
};

export const WithLongValues = ResponsiveTemplate.bind({});
WithLongValues.args = {
  ...args,
  data: data.map((dataPoint) => ({
    ...dataPoint,
    sales: dataPoint.sales * 10000000,
  })),
  valueFormatter: currencyValueFormatter,
};

export const WithVariantPie = DefaultTemplate.bind({});
WithVariantPie.args = {
  ...args,
  data,
  variant: "pie",
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

export const BlockExample = BlockTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BlockExample.args = {
  ...args,
  data,
  valueFormatter: currencyValueFormatter,
};

export const WithNoAnimation = DefaultTemplate.bind({});
WithNoAnimation.args = {
  data: data,
  showAnimation: false,
  category: "sales",
  index: "city",
};

export const WithDefaultAnimationDuration = DefaultTemplate.bind({});
WithDefaultAnimationDuration.args = {
  data: data,
  showAnimation: true,
  category: "sales",
  index: "city",
};

export const WithLongAnimationDuration = DefaultTemplate.bind({});
WithLongAnimationDuration.args = {
  data: data,
  showAnimation: true,
  animationDuration: 5000,
  category: "sales",
  index: "city",
};

export const WithShortAnimationDuration = DefaultTemplate.bind({});
WithShortAnimationDuration.args = {
  data: data,
  showAnimation: true,
  animationDuration: 100,
  category: "sales",
  index: "city",
};

export const WithOnValueChangeExample = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithOnValueChangeExample.args = {
  ...args,
  data,
  onValueChange: (value) => alert(JSON.stringify(value)),
};

export const WithOnValueChangePieExample = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithOnValueChangePieExample.args = {
  ...args,
  variant: "pie",
  data,
  onValueChange: (value) => alert(JSON.stringify(value)),
};

//Custom tooltips

// Override default colors with custom color in tooltip
// const customTooltipColors: Color[] = ["cyan", "red", "yellow", "blue", "green", "violet"];
export const WithCustomTooltipExample1 = DefaultTemplate.bind({});
WithCustomTooltipExample1.args = {
  ...args,
  data: data2,
  index: "month",
  category: "Sales",
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
            <div className="flex items-center justify-between space-x-8">
              <p className="text-right text-tremor-content whitespace-nowrap">
                {categoryPayload.name}
              </p>
              <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
                {currencyValueFormatter(categoryPayload.value as number)}
              </p>
            </div>
            <p>{label}</p>
            <p>{categoryPayload.dataKey}</p>
          </div>
        </div>
      </div>
    );
  },
};
