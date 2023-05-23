import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { List, ListItem } from "components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/ListElements/List",
  component: List,
} as ComponentMeta<typeof List>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof List> = (args) => (
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
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  className: "mt-5",
  children: undefined,
};
