import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card } from "components";
import Subtitle from "components/text-elements/Subtitle/Subtitle";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/TextElements/Subtitle",
  component: Subtitle,
} as ComponentMeta<typeof Subtitle>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof Subtitle> = (args) => (
  <Card>
    <Subtitle {...args} className="truncate">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry&apos;s standard dummy text ever since the 900s, when an unknown printer took
      a galley of type andSubtitleambled it to make a type specimen book.
    </Subtitle>
  </Card>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: null,
};

export const TextColor = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TextColor.args = {
  color: "green",
  className: "text-left",
  children: null,
};
