import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import RangeBar from "components/vis-elements/RangeBar/RangeBar";

import { Card, Metric } from "components";

import { BaseColors } from "lib/constants";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/VisElements/RangeBar",
  component: RangeBar,
} as ComponentMeta<typeof RangeBar>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof RangeBar> = (args) => (
  <>
    {Object.values(BaseColors).map((color) => (
      <Card key={color}>
        <Metric>$23.456</Metric>
        <RangeBar {...args} color={color} />
      </Card>
    ))}
  </>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  percentageValue: 50,
  minPercentageValue: 25,
  maxPercentageValue: 75,
  rangeTooltip: "Min: 25% Max: 75%",
  markerTooltip: "50%",
  className: "mt-5",
};
