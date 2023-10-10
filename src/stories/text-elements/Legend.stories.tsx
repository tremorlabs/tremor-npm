import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { Card, Legend } from "components";

export default {
  title: "Tremor/TextElements/Legend",
  component: Legend,
} as ComponentMeta<typeof Legend>;


const Template: ComponentStory<typeof Legend> = (args) => {
  if (args.onClickLegendItem?.length === 0) {
    args.onClickLegendItem = undefined;
  }

  return (
    <Card className="max-w-md">
      <Legend {...args} />
    </Card>
  );
};

const args = {
  categories: [
    "Critical",
    "This is a very long category name to test an edge case",
    "Category C",
    "Category D",
  ],
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  ...args,
};

export const WithOnClick = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithOnClick.args = {
  ...args,
  onClickLegendItem: (e) => alert(JSON.stringify(e)),
};

export const WithActiveLegend = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithActiveLegend.args = {
  ...args,
  activeLegend: "Category C",
};
