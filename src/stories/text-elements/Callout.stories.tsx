import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ArrowUpRightIcon } from "assets";

import { Callout } from "components";

import { BaseColors } from "lib/constants";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/TextElements/Callout",
  component: Callout,
} as ComponentMeta<typeof Callout>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const TemplateDefault: ComponentStory<typeof Callout> = (args) => (
  <>
    <div className="mb-5 max-w-lg">
      <Callout {...args} className="mt-5" />
    </div>
    <div className="mb-5 max-w-lg">
      {Object.values(BaseColors).map((color) => (
        <div key={color} className="mb-5 max-w-lg">
          <Callout {...args} color={color} className="h-24 mt-5" />
        </div>
      ))}
    </div>
  </>
);

export const Default = TemplateDefault.bind({});
Default.args = {
  title: "Performance Metric",
  children:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor lorem non est congue blandit. Praesent non lorem sodales, suscipit est sed, hendrerit dolor.",
};

export const WithIcon = TemplateDefault.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithIcon.args = {
  title: "Performance Metric",
  children:
    "You are outranking 83% of the sales representatives in your cohort. Sit repellendus qui ut at blanditis \
    et quo et molestiae. Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus \
    qui ut at blanditiis et quo et molestiae",
  icon: ArrowUpRightIcon,
};
