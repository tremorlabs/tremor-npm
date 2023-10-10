import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Card, Col, Grid, Metric } from "components";
import { SimpleCard } from "./helpers/SimpleCard";
import { SimpleText } from "./helpers/SimpleText";


export default {
  title: "Tremor/LayoutElements/Grid",
  component: Grid,
} as ComponentMeta<typeof Grid>;


const Template: ComponentStory<typeof Grid> = (args) => (
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

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  numItemsMd: 3,
  className: "gap-x-2 gap-y-2",
};
