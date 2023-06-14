import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import MarkerBar from "components/vis-elements/MarkerBar/MarkerBar";
import { Card, Metric } from "components";
import { BaseColors } from "lib/constants";

export default {
  title: "Tremor/VisElements/MarkerBar",
  component: MarkerBar,
} as ComponentMeta<typeof MarkerBar>;

const Template: ComponentStory<typeof MarkerBar> = (args) => (
  <>
    <Card className="mt-5">
      <Metric>$23.456</Metric>
      <MarkerBar {...args} />
    </Card>
    <Card className="mt-5">
      <Metric>$23.456</Metric>
      <MarkerBar value={50} minValue={25} maxValue={75} />
    </Card>
    {Object.values(BaseColors).map((color) => (
      <Card key={color} className="mt-5">
        <Metric>$23.456</Metric>
        <MarkerBar {...args} color={color} />
      </Card>
    ))}
  </>
);

export const Default = Template.bind({});
Default.args = {
  value: 50,
  rangeTooltip: "Min: 25% Max: 75%",
  markerTooltip: "50%",
  className: "mt-5",
};

export const WithRange = Template.bind({});
WithRange.args = {
  value: 50,
  minValue: 25,
  maxValue: 75,
  rangeTooltip: "Min: 25% Max: 75%",
  markerTooltip: "50%",
  className: "mt-5",
};
