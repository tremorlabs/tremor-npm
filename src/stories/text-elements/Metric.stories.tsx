import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BaseColors } from "lib/primitives";
import Metric from "../../components/text-elements/Metric/Metric";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/TextElements/Metric",
  component: Metric,
} as ComponentMeta<typeof Metric>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof Metric> = () => (
  <>
    {Object.values(BaseColors).map((color) => (
      <Metric color={color}>USD 70,000.00</Metric>
    ))}
  </>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
