import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import CategoryBar from "components/vis-elements/CategoryBar/CategoryBar";

import { Card, Metric } from "components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/VisElements/CategoryBar",
  component: CategoryBar,
} as ComponentMeta<typeof CategoryBar>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof CategoryBar> = (args) => (
  <Card>
    <Metric>$23.456</Metric>
    <CategoryBar {...args} />
  </Card>
);

export const Default = Template.bind({});
Default.args = {
  values: [60, 10, 20, 10],
  className: "mt-5",
};

export const WithMarker = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithMarker.args = {
  values: [20, 15, 45, 20],
  colors: ["emerald", "yellow", "orange", "rose"],
  markerValue: 50,
  tooltip: "90%",
  className: "mt-5",
};

export const WithMarkerOnLabel = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithMarkerOnLabel.args = {
  values: [0, 50, 50],
  colors: ["emerald", "yellow", "orange", "rose"],
  markerValue: 50,
  tooltip: "90%",
  className: "mt-5",
};

export const WithSmallStartValue = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithSmallStartValue.args = {
  values: [10, 25, 45, 20],
  colors: ["emerald", "yellow", "orange", "rose"],
  markerValue: 50,
  tooltip: "90%",
  className: "mt-5",
};

export const WithCloseEndValue = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCloseEndValue.args = {
  values: [10, 25, 50, 15],
  colors: ["emerald", "yellow", "orange", "rose"],
  markerValue: 50,
  tooltip: "90%",
  className: "mt-5",
};

export const WithZeroValues = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithZeroValues.args = {
  values: [10, 25, 0, 50, 0, 15, 0],
  colors: ["emerald", "yellow", "orange", "rose"],
  markerValue: 50,
  tooltip: "90%",
  className: "mt-5",
};

export const WithConsecutiveSmallValues = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithConsecutiveSmallValues.args = {
  values: [10, 5, 5, 5, 5, 5, 50, 15, 0],
  markerValue: 50,
  tooltip: "90%",
  className: "mt-5",
};

export const WithNoLabelsInbetween = Template.bind({});
WithNoLabelsInbetween.args = {
  values: [5, 95],
  markerValue: 50,
  tooltip: "90%",
  className: "mt-5",
};

export const WithNoLabels = Template.bind({});
WithNoLabels.args = {
  values: [5, 95],
  markerValue: 50,
  tooltip: "90%",
  className: "mt-5",
  showLabels: false,
};
