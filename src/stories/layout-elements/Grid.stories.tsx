import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Card, Col, Grid, Metric } from "components";
import { SimpleCard } from "./helpers/SimpleCard";
import { SimpleText } from "./helpers/SimpleText";

const meta: Meta<typeof Grid> = {
  title: "Components/Layout/Grid",
  component: Grid,
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const ThreeItems: Story = {
  render: ({ ...args }) => (
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
  ),
  args: { numItemsMd: 3, className: "gap-x-2 gap-y-2" },
};
