import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { Card, List, ListItem } from "components";


export default {
  title: "Tremor/ListElements/List",
  component: List,
} as ComponentMeta<typeof List>;


const Template: ComponentStory<typeof List> = (args) => (
  <Card>
    <List {...args}>
      <ListItem>
        <div>Hello</div>
        <div>World</div>
      </ListItem>
      <ListItem>
        <div>Hello</div>
        <div>World</div>
      </ListItem>
    </List>
  </Card>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  className: "mt-5",
  children: undefined,
};
