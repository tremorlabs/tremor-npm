import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Flex, ProgressBar, Text } from "components";
import Block from "components/layout-elements/Block/Block";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/LayoutElements/Block",
  component: Block,
} as ComponentMeta<typeof Block>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof Block> = (args) => (
  <Flex {...args}>
    <Block>
      <Text>Hello World</Text>
      <ProgressBar marginTop="mt-14" percentageValue={32} />
    </Block>
    <div>Some text</div>
  </Flex>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: null,
};
