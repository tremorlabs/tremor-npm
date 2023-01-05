import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ArrowUpRightIcon } from "assets";

import Callout from "../../components/text-elements/Callout/Callout";

import { BaseColors } from "lib/primitives";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/TextElements/Callout",
  component: Callout,
} as ComponentMeta<typeof Callout>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof Callout> = (args) => (
  <>
    {Object.values(BaseColors).map((color) => (
      <div className="tr-mb-5 tr-max-w-lg">
        <Callout {...args} color={color} />
      </div>
    ))}
  </>
);

export const Default = Template.bind({});
Default.args = {
  title: "Performance Metric",
  text: "You are outranking 83% of the sales representatives in your cohort. Sit repellendus qui ut at blanditis \
           et quo et molestiae. Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus \
           qui ut at blanditiis et quo et molestiae",
};

export const WithIcon = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithIcon.args = {
  title: "Performance Metric",
  text: "You are outranking 83% of the sales representatives in your cohort. Sit repellendus qui ut at blanditis \
           et quo et molestiae. Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus \
           qui ut at blanditiis et quo et molestiae",
  icon: ArrowUpRightIcon,
};
