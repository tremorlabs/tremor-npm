import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import Bold from "components/text-elements/Bold/Bold";
import Italic from "components/text-elements/Italic/Italic";

import Text from "components/text-elements/Text/Text";
import Title from "components/text-elements/Title/Title";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/TextElements/TextElements",
  component: Title,
} as ComponentMeta<typeof Title>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof Text> = () => (
  <Text>
    Text with <Bold>bold text</Bold> and <Italic>Italics Text</Italic>
    and{" "}
    <Bold>
      <Italic>Bold italics text</Italic>
    </Bold>
  </Text>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  textAlignment: "text-left",
};
