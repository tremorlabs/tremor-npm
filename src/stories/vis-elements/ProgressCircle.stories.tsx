import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card, Metric, ProgressCircle } from "components";

import { BaseColors, Sizes } from "lib/constants";
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
    <div className="flex flex-col gap-y-5">
      {Object.values(BaseColors).map((color) => (
        <ProgressCircle {...args} color={color} key={color} />
      ))}
    </div>
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
