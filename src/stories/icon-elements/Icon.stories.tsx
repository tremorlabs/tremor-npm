import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { ArrowUpIcon } from "assets";

import { BaseColors, Sizes as InputSizes } from "lib/constants";
import { Card, Grid, Flex, Title } from "components";

import { IconVariants } from "components/icon-elements/Icon/Icon";

import Icon from "components/icon-elements/Icon/Icon";

const meta: Meta<typeof Icon> = {
  title: "Tremor/IconElements/Icon",
  component: Icon,
  decorators: [(Story) => <Story />],
  args: {
    icon: ArrowUpIcon,
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

const IconTemplateSizes: Story = {
  render: ({ ...args }) => {
    return (
      <Card>
        <Grid numItems={5}>
          {Object.values(IconVariants).map((variant) => (
            <div key={variant}>
              <text>{variant}</text>
              {Object.values(InputSizes).map((size) => (
                <div key={size} className="mt-2">
                  <Icon variant={variant} size={size} tooltip="Tooltip" {...args} />
                </div>
              ))}
            </div>
          ))}
        </Grid>
      </Card>
    );
  },
};

const IconTemplateColors: Story = {
  render: ({ ...args }) => {
    return (
      <Grid numItemsLg={2} className="gap-x-2 gap-y-2">
        {Object.values(IconVariants).map((variant) => (
          <Card key={variant} className="max-w-lg">
            <text>{variant}</text>
            <Grid numItems={5}>
              {Object.values(BaseColors).map((color) => (
                <div key={color} className="mt-2">
                  <Icon variant={variant} color={color} {...args} />
                </div>
              ))}
            </Grid>
          </Card>
        ))}
      </Grid>
    );
  },
};

const IconTemplateResponsive: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <Title>Mobile</Title>
        <div className="w-64">
          <Card>
            <div className="space-y-2">
              {Object.values(IconVariants).map((variant) => (
                <Flex key={variant}>
                  <Icon {...args} variant={variant} />
                  <Icon {...args} variant={variant} />
                </Flex>
              ))}
            </div>
          </Card>
        </div>
        <Title className="mt-5">Desktop</Title>
        <Card>
          <div className="space-y-2">
            {Object.values(IconVariants).map((variant) => (
              <Flex key={variant}>
                <Icon {...args} variant={variant} />
                <Icon {...args} variant={variant} />
              </Flex>
            ))}
          </div>
        </Card>
      </>
    );
  },
};

export const SizesExample: Story = {
  ...IconTemplateSizes,
};

export const DefaultExample: Story = {
  ...IconTemplateResponsive,
};

export const ColorsExample: Story = {
  ...IconTemplateColors,
};
