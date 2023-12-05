import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { BaseColors, Sizes as InputSizes } from "lib/constants";

import { ArrowUpIcon } from "assets";
import { Badge, Grid } from "components";

const meta: Meta<typeof Badge> = {
  title: "UI/Icon/Badge",
  component: Badge,
  args: {
    children: "Live",
    tooltip: "Tooltip",
    icon: ArrowUpIcon,
  },
  parameters: {
    sourceLink: "https://github.com/tremorlabs/tremor/tree/main/src/components/icon-elements/Badge",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

const BadgeTemplateColors: Story = {
  render: ({ ...args }) => {
    return (
      <Grid className="gap-y-2">
        <Badge tooltip="Tooltip" {...args} />
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
