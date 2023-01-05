import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card, Col, ColGrid, Metric } from "components";
import { SimpleCard } from "./helpers/SimpleCard";
import { SimpleText } from "./helpers/SimpleText";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/LayoutElements/ColGrid",
  component: ColGrid,
} as ComponentMeta<typeof ColGrid>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof ColGrid> = (args) => (
  <ColGrid {...args}>
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
  </ColGrid>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  numColsMd: 3,
  gapX: "gap-x-2",
  gapY: "gap-y-2",
};
