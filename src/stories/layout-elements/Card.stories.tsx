import React from "react";

import { BaseColors, HorizontalPosition, VerticalPosition } from "lib";
import { Card, Grid, Flex, Metric, Title } from "components";
import { SimpleCard } from "./helpers/SimpleCard";

import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  title: "Tremor/LayoutElements/Card",
  component: Card,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof Card>;

const CardResponsiveFlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <Title>Mobile</Title>
        <div className="w-64">
          <SimpleCard {...args} />
        </div>
        <Title className="mt-5">Desktop</Title>
        <SimpleCard {...args} />
      </>
    );
  },
};

const CardFlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
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
  },
};

const DecorationPositionsTemplate: Story = {
  render: ({ ...args }) => {
    return (
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
  },
};

const DecorationColorsTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <Grid numItems={3} className="gap-x-2 gap-y-2">
        {Object.values(BaseColors).map((color) => (
          <Card {...args} key={color} decoration="top" decorationColor={color}>
            <Title>{`Decoration Color: ${color}`}</Title>
          </Card>
        ))}
      </Grid>
    );
  },
};

export const DefaultExample: Story = {
  ...CardResponsiveFlexTemplate,
};

export const DecorationPositionsExample: Story = {
  ...DecorationPositionsTemplate,
};

export const DecorationColorsExample: Story = {
  ...DecorationColorsTemplate,
};

export const WithMaxWidth: Story = {
  ...CardFlexTemplate,
  args: {
    className: "max-w-sm",
  },
};

export const FlexExample: Story = {
  ...CardFlexTemplate,
};
