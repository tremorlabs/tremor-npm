import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Card, Col, Grid, Metric } from "components";
import { SimpleCard } from "./helpers/SimpleCard";
import { SimpleText } from "./helpers/SimpleText";

const meta: Meta<typeof Grid> = {
  title: "Tremor/LayoutElements/Grid",
  component: Grid,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof Grid>;

const GridTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <Grid {...args}>
        <Col numColSpanMd={2}>
          <SimpleCard />
        </Col>
        <SimpleCard />
        <SimpleCard />
        <SimpleCard />
        <Card>
          <Metric>$ 40,000</Metric>
          <SimpleText />
        </Card>
      </Grid>
    );
  },
};

export const DefaultExample: Story = {
  ...GridTemplate,
  args: {
    numItemsMd: 3,
    className: "gap-x-2 gap-y-2",
  },
};
