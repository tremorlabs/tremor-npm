import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Title } from "components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/TextElements/Title",
  component: Title,
} as ComponentMeta<typeof Title>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof Title> = () => <Title>Title</Title>;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
