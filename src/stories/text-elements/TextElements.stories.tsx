import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Bold, Italic, Text, Title } from "components";


export default {
  title: "Tremor/TextElements/TextElements",
  component: Title,
} as ComponentMeta<typeof Title>;


const Template: ComponentStory<typeof Text> = () => (
  <Text>
    Text with <Bold>bold text</Bold> and <Italic>Italics Text</Italic> and{" "}
    <Bold>
      <Italic>Bold italics text</Italic>
    </Bold>
  </Text>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  className: "text-left",
};
