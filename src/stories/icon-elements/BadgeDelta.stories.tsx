import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { DeltaTypes as InputDeltaTypes, Sizes as InputSizes } from "lib/constants";

import { Card, Grid, Flex, Title } from "components";
import BadgeDelta from "components/icon-elements/BadgeDelta/BadgeDelta";

const meta: Meta<typeof BadgeDelta> = {
  title: "Tremor/IconElements/BadgeDelta",
  component: BadgeDelta,
  decorators: [(Story) => <Story />],
  args: {
    children: "Live",
  },
};

export default meta;
type Story = StoryObj<typeof BadgeDelta>;

const BadgeDeltaResponsiveFlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <Title>Mobile</Title>
        <div className="w-64">
          <Card>
            <Flex>
              <BadgeDelta {...args} />
              <BadgeDelta {...args} />
            </Flex>
          </Card>
        </div>
        <Title className="mt-5">Desktop</Title>
        <Card>
          <Flex>
            <BadgeDelta {...args} />
            <BadgeDelta {...args} />
          </Flex>
        </Card>
      </>
    );
  },
};

const BadgeDeltaTemplateSizes: Story = {
  render: ({ ...args }) => {
    return (
      <Card className="max-w-lg">
        <Grid numItems={2} className="gap-y-2">
          {Object.values(InputSizes).map((size) => (
            <>
              <BadgeDelta size={size} deltaType="increase" {...args} />
              <BadgeDelta size={size} deltaType="decrease" {...args} />
            </>
          ))}
        </Grid>
      </Card>
    );
  },
};

const BadgeDeltaTemplateTypes: Story = {
  render: ({ ...args }) => {
    return (
      <Card className="max-w-sm">
        <Grid className="gap-y-1">
          {Object.values(InputDeltaTypes).map((deltaType) => (
            <BadgeDelta key={deltaType} deltaType={deltaType} {...args} />
          ))}
        </Grid>
      </Card>
    );
  },
};

export const DefaultExample: Story = {
  ...BadgeDeltaResponsiveFlexTemplate,
};

export const SizesExample: Story = {
  ...BadgeDeltaTemplateSizes,
};

export const TypesExample: Story = {
  ...BadgeDeltaTemplateTypes,
};
