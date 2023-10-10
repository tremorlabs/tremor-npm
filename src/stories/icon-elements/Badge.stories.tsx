import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { BaseColors } from "lib/constants";
import { Sizes as InputSizes } from "lib/constants";

import { Grid, Badge } from "components";
import { ArrowUpIcon } from "assets";

const meta: Meta<typeof Badge> = {
  title: "Tremor/IconElements/Badge",
  component: Badge,
  args: {
    children: "Live",
    tooltip: "Tooltip",
    icon: ArrowUpIcon,
  },
  // parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Badge>;

const BadgeTemplateColors: Story = {
  render: ({ ...args }) => {
    return (
      <Grid className="gap-y-2">
        {Object.values(BaseColors).map((color) => (
          <Badge key={color} color={color} tooltip="Tooltip" {...args} />
        ))}
      </Grid>
    );
  },
};

const BadgeTemplateSizes: Story = {
  render: ({ ...args }) => {
    return (
      <Grid className="gap-y-2">
        {Object.values(InputSizes).map((size) => (
          <Badge key={size} size={size} tooltip="Tooltip" {...args} />
        ))}
      </Grid>
    );
  },
};

export const Default: Story = {
  args: {},
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
