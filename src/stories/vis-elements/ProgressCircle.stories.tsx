import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card, ProgressCircle, Title, Text } from "components";

import { BaseColors } from "lib/constants";
import { Flex } from "components";
import { template } from "@babel/core";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/VisElements/ProgressCircle",
  component: ProgressCircle,
} as ComponentMeta<typeof ProgressCircle>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const TemplateRainbowColorDemo: ComponentStory<typeof ProgressCircle> = (args) => (
  <>
    {Object.values(BaseColors).map((color) => (
      <Card key={color} className="mt-5 flex items-center space-x-6">
        <ProgressCircle {...args} color={color} />
        <div>
          <Title>Sales Goals</Title>
          <Text>Overview Q1-Q3 2023</Text>
        </div>
      </Card>
    ))}
  </>
);

const TemplateSingle: ComponentStory<typeof ProgressCircle> = (args) => (
  <>
    <div className="flex flex-row gap-x-5">
      <ProgressCircle {...args} />
    </div>
  </>
);

export const RainbowColor = TemplateRainbowColorDemo.bind({});
RainbowColor.args = {
  value: 42,
};

export const WithToolTip = TemplateSingle.bind({});
WithToolTip.args = {
  value: 86,
  showValue: true,
  tooltip: "progress so far",
};
