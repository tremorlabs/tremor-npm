import React from "react";

import { BaseColors, HorizontalPosition, VerticalPosition } from "lib";
import { Card, Grid, Flex, Metric, Title } from "components";
import { SimpleCard } from "./helpers/SimpleCard";

import { ComponentMeta, ComponentStory } from "@storybook/react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/LayoutElements/Card",
  component: Card,
} as ComponentMeta<typeof Card>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof Card> = (args) => (
  <>
    <Title>Mobile</Title>
    <div className="w-64">
      <SimpleCard {...args} />
    </div>
    <Title className="mt-5">Desktop</Title>
    <SimpleCard {...args} />
  </>
);

const FlexTemplate: ComponentStory<typeof Card> = (args) => (
  <>
    <Flex alignItems="stretch" className="space-x-2">
      <SimpleCard {...args} />
      <SimpleCard {...args} />
      <Card {...args}>
        <Metric>$ 30,000</Metric>
      </Card>
    </Flex>
    <Flex alignItems="stretch" className="mt-5 space-x-2">
      <div className="space-y-2">
        <SimpleCard {...args} />
        <SimpleCard {...args} />
        <SimpleCard {...args} />
      </div>
      <SimpleCard {...args} />
    </Flex>
  </>
);

const DecorationPositionsTemplate: ComponentStory<typeof Card> = (args) => (
  <Grid numItems={2} className="gap-x-2 gap-y-2">
    {["left", "top", "right", "bottom", "mistyped"].map((position) => (
      <Card
        {...args}
        key={position}
        decoration={position as HorizontalPosition | VerticalPosition | ""}
      >
        <Title>{`Decoration ${position}`}</Title>
      </Card>
    ))}
  </Grid>
);

const DecorationColorsTemplate: ComponentStory<typeof Card> = (args) => (
  <Grid numItems={3} className="gap-x-2 gap-y-2">
    {Object.values(BaseColors).map((color) => (
      <Card {...args} key={color} decoration="top" decorationColor={color}>
        <Title>{`Decoration Color: ${color}`}</Title>
      </Card>
    ))}
  </Grid>
);

export const Default = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const DecorationPositions = DecorationPositionsTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const DecorationColors = DecorationColorsTemplate.bind({});

export const WithMaxWidth = FlexTemplate.bind({});
WithMaxWidth.args = {
  className: "max-w-sm",
};

export const WithFlexItemsStretch = FlexTemplate.bind({});
