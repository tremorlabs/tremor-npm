import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BaseColors } from "lib/constants";
import { Metric } from "components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/TextElements/Metric",
  component: Metric,
} as ComponentMeta<typeof Metric>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof Metric> = () => (
  <>
    {Object.values(BaseColors).map((color) => (
      <Metric key={color} color={color}>
        USD 70,000.00
      </Metric>
    ))}
  </>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
