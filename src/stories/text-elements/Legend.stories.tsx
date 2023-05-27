import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Card, Legend } from "components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/TextElements/Legend",
  component: Legend,
} as ComponentMeta<typeof Legend>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Legend> = (args) => (
  <Card className="max-w-md">
    <Legend {...args} />
  </Card>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  categories: [
    "Critical",
    "This is a very long category name to test an edge case",
    "Category C",
    "Category D",
  ],
};
