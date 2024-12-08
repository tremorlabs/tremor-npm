import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { BaseColors, Sizes as InputSizes } from "lib/constants";

import { ArrowUpIcon } from "assets";
import { Badge } from "components";

const meta: Meta<typeof Badge> = {
  title: "UI/Icon/Badge",
  component: Badge,
  args: {
    children: "Live",
    icon: ArrowUpIcon,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

const BadgeTemplateColors: Story = {
  render: () => {
    return (
      <div>
        {Object.values(BaseColors).map((color) => (
          <Badge key={color} icon={ArrowUpIcon} color={color}>
            {color}
          </Badge>
        ))}
      </div>
    );
  },
};

const BadgeTemplateSizes: Story = {
  render: ({ ...args }) => {
    return (
      <div>
        {Object.values(InputSizes).map((size) => (
          <Badge key={size} size={size} {...args} />
        ))}
      </div>
    );
  },
};

export const Default: Story = {};

export const Sizes: Story = {
  ...BadgeTemplateSizes,
};

export const Colors: Story = {
  ...BadgeTemplateColors,
};

export const NoIcon: Story = {
  args: {
    icon: undefined,
  },
};
