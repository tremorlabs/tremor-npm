import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "components";
import Subtitle from "components/text-elements/Subtitle/Subtitle";


export default {
  title: "Tremor/TextElements/Subtitle",
  component: Subtitle,
} as ComponentMeta<typeof Subtitle>;


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
