import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Card, Text } from "components";


export default {
  title: "Tremor/TextElements/Text",
  component: Text,
} as ComponentMeta<typeof Text>;


const Template: ComponentStory<typeof Text> = (args) => (
  <Card>
    <Text {...args} className="truncate">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry&apos;s standard dummy text ever since the 900s, when an unknown printer took
      a galley of type and scrambled it to make a type specimen book.
    </Text>
  </Card>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: null,
};

export const TextCenter = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TextCenter.args = {
  className: "text-center",
  children: null,
};

export const TextRight = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TextRight.args = {
  className: "text-right",
  children: null,
};

export const TextJustify = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TextJustify.args = {
  className: "text-justify",
  children: null,
};

export const TextColor = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TextColor.args = {
  color: "green",
  className: "text-left",
  children: null,
};
