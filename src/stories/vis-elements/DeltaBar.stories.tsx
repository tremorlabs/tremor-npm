import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { Card, DeltaBar, Metric } from "components";


export default {
  title: "Tremor/VisElements/DeltaBar",
  component: DeltaBar,
} as ComponentMeta<typeof DeltaBar>;


const Template: ComponentStory<typeof DeltaBar> = (args) => (
  <Card>
    <Metric>72.000 USD</Metric>
    <DeltaBar {...args} />
  </Card>
);

export const Increase = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Increase.args = {
  value: 30,
  className: "mt-5",
  tooltip: "30%",
};

export const Decrease = Template.bind({});
Decrease.args = {
  value: -50,
  className: "mt-5",
  tooltip: "-50%",
};

export const IncreaseReversed = Template.bind({});
IncreaseReversed.args = {
  value: 50,
  isIncreasePositive: false,
  className: "mt-5",
};
