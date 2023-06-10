import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { BaseColors } from "lib/constants";
import { Sizes as InputSizes } from "lib/constants";

import { Card, Grid, Flex, Title } from "components";
import { ArrowUpIcon } from "assets";
import Badge from "components/icon-elements/Badge/Badge";

const meta: Meta<typeof Badge> = {
  title: "Tremor/IconElements/Badge",
  component: Badge,
  decorators: [(Story) => <Story />],
  args: {
    children: "Live",
    tooltip: "Tooltip",
    icon: ArrowUpIcon,
  },
};

const BadgeResponsiveFlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <Title>Mobile</Title>
        <div className="w-64">
          <Card>
            <Flex>
              <Badge {...args} />
              <Badge {...args} />
            </Flex>
          </Card>
        </div>
        <Title className="mt-5">Desktop</Title>
        <Card>
          <Flex>
            <Badge {...args} />
            <Badge {...args} />
          </Flex>
        </Card>
      </>
    );
  },
};

const BadgeTemplateColors: Story = {
  render: ({ ...args }) => {
    return (
      <Card>
        <Grid className="gap-y-2">
          {Object.values(BaseColors).map((color) => (
            <Badge key={color} color={color} tooltip="Tooltip" {...args} />
          ))}
        </Grid>
      </Card>
    );
  },
};

const BadgeTemplateSizes: Story = {
  render: ({ ...args }) => {
    return (
      <Card>
        <Grid className="gap-y-2">
          {Object.values(InputSizes).map((size) => (
            <Badge key={size} size={size} tooltip="Tooltip" {...args} />
          ))}
        </Grid>
      </Card>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const DefaultExample: Story = {
  ...BadgeResponsiveFlexTemplate,
};

export const SizesExample: Story = {
  ...BadgeTemplateSizes,
};

export const ColorsExample: Story = {
  ...BadgeTemplateColors,
};

export const NoIconExample: Story = {
  args: {
    icon: undefined,
  },
};
