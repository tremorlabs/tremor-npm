import React from "react";

import { Card, List, ListItem } from "components";

import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof List> = {
  title: "Tremor/ListElements/List",
  component: List,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof List>;

const ListResponsiveFlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
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
  },
};

export const DefaultExample: Story = {
  ...ListResponsiveFlexTemplate,
  args: {
    className: "mt-5",
    children: undefined,
  },
};
