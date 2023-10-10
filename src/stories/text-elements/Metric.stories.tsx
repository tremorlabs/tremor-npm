import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { BaseColors } from "lib/constants";
import { Metric } from "components";


export default {
  title: "Tremor/TextElements/Metric",
  component: Metric,
} as ComponentMeta<typeof Metric>;


const Template: ComponentStory<typeof Metric> = () => (
  <>
    <Metric>USD 70,000.00</Metric>
    {Object.values(BaseColors).map((color) => (
      <Metric key={color} color={color}>
        USD 70,000.00
      </Metric>
    ))}
  </>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
