import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card, Flex, Metric } from "components";
import { SimpleCard } from "stories/layout-elements/helpers/SimpleCard";
import { SimpleText } from "stories/layout-elements/helpers/SimpleText";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/LayoutElements/Flex",
  component: Flex,
} as ComponentMeta<typeof Flex>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const TemplateMaxWidth: ComponentStory<typeof Flex> = (args) => (
  <Flex {...args}>
    <div>
      <SimpleCard maxWidth="max-w-sm" />
    </div>
    <div>
      <Card className="max-w-sm">
        <Metric>$ 40,000</Metric>
        <SimpleText />
      </Card>
    </div>
  </Flex>
);

const TemplateWFull: ComponentStory<typeof Flex> = (args) => (
  <Flex {...args}>
    <SimpleCard />
    <Card>
      <Metric>$ 40,000</Metric>
      <SimpleText />
    </Card>
  </Flex>
);

export const Default = TemplateMaxWidth.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const JustifyEnd = TemplateMaxWidth.bind({});
JustifyEnd.args = {
  justifyContent: "end",
};

export const JustifyStart = TemplateMaxWidth.bind({});
JustifyStart.args = {
  justifyContent: "start",
};

export const ItemsStart = TemplateMaxWidth.bind({});
ItemsStart.args = {
  alignItems: "start",
};

export const ItemsEnd = TemplateMaxWidth.bind({});
ItemsEnd.args = {
  alignItems: "end",
};

export const ItemsStretch = TemplateWFull.bind({});
ItemsStretch.args = {
  alignItems: "stretch",
};

export const SpaceX = TemplateMaxWidth.bind({});
SpaceX.args = {
  justifyContent: "start",
  alignItems: "baseline",
  className: "space-x-8",
};
