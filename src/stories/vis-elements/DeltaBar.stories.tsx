import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Card, DeltaBar, Metric } from "components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/VisElements/DeltaBar",
  component: DeltaBar,
} as ComponentMeta<typeof DeltaBar>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof DeltaBar> = (args) => (
  <Card>
    <Metric>72.000 USD</Metric>
    <DeltaBar {...args} />
  </Card>
);

export const Increase = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Increase.args = {
  percentageValue: 30,
  className: "mt-5",
  tooltip: "30%",
};

export const Decrease = Template.bind({});
Decrease.args = {
  percentageValue: -50,
  className: "mt-5",
  tooltip: "-50%",
};

export const IncreaseReversed = Template.bind({});
IncreaseReversed.args = {
  percentageValue: 50,
  isIncreasePositive: false,
  className: "mt-5",
};
