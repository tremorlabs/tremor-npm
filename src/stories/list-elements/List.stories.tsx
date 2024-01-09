import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { List, ListItem } from "components";

const meta: Meta<typeof List> = {
  title: "UI/List/List",
  component: List,
  parameters: {
    sourceLink: "https://github.com/tremorlabs/tremor/tree/main/src/components/list-elements/List",
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: (args) => (
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
  ),
  args: {
    className: "mt-5",
    children: undefined,
  },
};
