import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card, Metric, ProgressCircle } from "components";

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
    <div className="flex flex-row gap-x-5">
      {Object.values(BaseColors).map((color) => (
        <ProgressCircle {...args} color={color} key={color} />
      ))}
    </div>
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
