import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card, Col, Grid, Metric } from "components";
import { SimpleCard } from "./helpers/SimpleCard";
import { SimpleText } from "./helpers/SimpleText";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/LayoutElements/Grid",
  component: Grid,
} as ComponentMeta<typeof Grid>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

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
