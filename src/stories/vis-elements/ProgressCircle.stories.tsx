import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card, ProgressCircle, Title, Text } from "components";

import { BaseColors, Sizes } from "lib/constants";

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

const TemplateDifferentSizes: ComponentStory<typeof ProgressCircle> = (args) => (
  <>
    <div className="flex flex-col gap-y-5">
      {Object.values(Sizes).map((size) => (
        <ProgressCircle {...args} size={size} key={size} />
      ))}
    </div>
  </>
);

export const RainbowColor = TemplateRainbowColorDemo.bind({});
RainbowColor.args = {
  value: 42,
};

export const differentSizes = TemplateDifferentSizes.bind({});
differentSizes.args = {
  value: 86,
  showLabel: true,
  tooltip: "progress so far",
};

export const withoutAnimation = TemplateDifferentSizes.bind({});
withoutAnimation.args = {
  value: 56,
  showAnimation: false,
};

export const withoutLabel = TemplateDifferentSizes.bind({});
withoutLabel.args = {
  value: 56,
  showLabel: false,
};
