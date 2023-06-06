import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BadgeDelta, Card, DonutChart, Flex, List, ListItem, Title } from "components";
import { DeltaType } from "lib";

import { simpleSingleCategoryData as data } from "stories/chart-elements/helpers/testData";
import { valueFormatter } from "stories/chart-elements/helpers/utils";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/ChartElements/DonutChart",
  component: DonutChart,
} as ComponentMeta<typeof DonutChart>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof DonutChart> = (args) => (
  <>
    <Title>Mobile</Title>
    <div className="w-64">
      <Card>
        <DonutChart {...args} />
      </Card>
    </div>
    <Title className="mt-5">Desktop</Title>
    <Card>
      <DonutChart {...args} />
    </Card>
  </>
);

const DefaultTemplate: ComponentStory<typeof DonutChart> = ({ ...args }) => (
  <Card>
    <DonutChart {...args} />
  </Card>
);

const BlockTemplate: ComponentStory<typeof DonutChart> = (args) => (
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
  valueFormatter: valueFormatter,
};

export const WithCustomLabel = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomLabel.args = {
  ...args,
  data,
  valueFormatter: valueFormatter,
  label: "Hello there",
};

export const WithLabelDisabled = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLabelDisabled.args = {
  ...args,
  data,
  valueFormatter: valueFormatter,
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
  valueFormatter: valueFormatter,
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
  valueFormatter: valueFormatter,
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
