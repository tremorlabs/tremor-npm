import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Card, Flex, Metric } from "components";
import { SimpleCard } from "stories/layout-elements/helpers/SimpleCard";
import { SimpleText } from "stories/layout-elements/helpers/SimpleText";

const meta: Meta<typeof Flex> = {
  title: "UI/Layout/Flex",
  component: Flex,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/layout-elements/Flex",
  },
};

export default meta;
type Story = StoryObj<typeof Flex>;

const MaxWidthSmTemplate: Story = {
  render: ({ ...args }) => (
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
  ),
};

const WFullTemplate: Story = {
  render: ({ ...args }) => (
    <Flex {...args}>
      <SimpleCard />
      <Card>
        <Metric>$ 40,000</Metric>
        <SimpleText />
      </Card>
    </Flex>
  ),
};

export const Default: Story = {
  ...MaxWidthSmTemplate,
  args: {},
};

export const JustifyEnd: Story = {
  ...MaxWidthSmTemplate,
  args: {
    justifyContent: "end",
  },
};

export const JustifyStart: Story = {
  ...MaxWidthSmTemplate,
  args: {
    justifyContent: "start",
  },
};

export const ItemsStart: Story = {
  ...MaxWidthSmTemplate,
  args: {
    alignItems: "start",
  },
};

export const ItemsEnd: Story = {
  ...MaxWidthSmTemplate,
  args: {
    alignItems: "end",
  },
};

export const ItemsStretch: Story = {
  ...WFullTemplate,
  args: {
    alignItems: "stretch",
  },
};

export const SpaceX: Story = {
  ...MaxWidthSmTemplate,
  args: {
    justifyContent: "start",
    alignItems: "baseline",
    className: "space-x-8",
  },
};
