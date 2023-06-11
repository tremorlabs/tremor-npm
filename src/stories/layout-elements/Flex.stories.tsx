import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Card, Flex, Metric } from "components";
import { SimpleCard } from "stories/layout-elements/helpers/SimpleCard";
import { SimpleText } from "stories/layout-elements/helpers/SimpleText";

const meta: Meta<typeof Flex> = {
  title: "Tremor/LayoutElements/Flex",
  component: Flex,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof Flex>;

const TemplateMaxWidth: Story = {
  render: ({ ...args }) => {
    return (
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
  },
};

const TemplateWFull: Story = {
  render: ({ ...args }) => {
    return (
      <Flex {...args}>
        <SimpleCard />
        <Card>
          <Metric>$ 40,000</Metric>
          <SimpleText />
        </Card>
      </Flex>
    );
  },
};

export const Default: Story = {
  ...TemplateMaxWidth,
};

export const JustifyEnd: Story = {
  ...TemplateMaxWidth,
  args: {
    justifyContent: "end",
  },
};

export const JustifyStart: Story = {
  ...TemplateMaxWidth,
  args: {
    justifyContent: "start",
  },
};

export const AlignEnd: Story = {
  ...TemplateMaxWidth,
  args: {
    alignItems: "end",
  },
};

export const AlignStart: Story = {
  ...TemplateMaxWidth,
  args: {
    alignItems: "start",
  },
};

export const ItemsStretch: Story = {
  ...TemplateWFull,
  args: {
    alignItems: "stretch",
  },
};

export const SpaceX: Story = {
  ...TemplateMaxWidth,
  args: {
    justifyContent: "start",
    alignItems: "baseline",
    className: "space-x-8",
  },
};
