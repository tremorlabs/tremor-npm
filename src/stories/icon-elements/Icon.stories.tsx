import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { ArrowUpIcon } from "assets";

import { Grid } from "components";
import { BaseColors, Sizes as InputSizes } from "lib/constants";

import { IconVariants } from "components/icon-elements/Icon/Icon";

import Icon from "components/icon-elements/Icon/Icon";

const meta: Meta<typeof Icon> = {
  title: "UI/Icon/Icon",
  component: Icon,
  args: {
    icon: ArrowUpIcon,
  },
  parameters: {
    sourceLink: "https://github.com/tremorlabs/tremor/tree/main/src/components/icon-elements/Icon",
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

const IconTemplateSizes: Story = {
  render: ({ ...args }) => {
    return (
      <Grid numItems={5}>
        {Object.values(IconVariants).map((variant) => (
          <div key={variant}>
            <p>{variant}</p>
            {Object.values(InputSizes).map((size) => (
              <div key={size} className="mt-2">
                <Icon variant={variant} size={size} tooltip="Tooltip" {...args} />
              </div>
            ))}
          </div>
        ))}
      </Grid>
    );
  },
};

const IconTemplateColors: Story = {
  render: ({ ...args }) => {
    return (
      <Grid numItemsLg={2} className="gap-x-2 gap-y-2">
        {Object.values(IconVariants).map((variant) => (
          <>
            <Grid numItems={5}>
              {Object.values(BaseColors).map((color) => (
                <>
                  <div key={color} className="mt-2">
                    <Icon variant={variant} color={color} {...args} />
                  </div>
                </>
              ))}
            </Grid>
          </>
        ))}
      </Grid>
    );
  },
};

const IconShrink: Story = {
  render: ({ ...args }) => {
    return (
      <div className="flex flex-wrap items-center justify-center space-x-3 sm:space-x-12">
        <Icon variant="simple" tooltip="simple" {...args} />
        <Icon variant="shadow" tooltip="shadow" {...args} />
        <Icon variant="outlined" tooltip="outlined" {...args} />
        <Icon variant="light" tooltip="light" {...args} />
        <Icon variant="solid" tooltip="solid" {...args} />
      </div>
    );
  },
};

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  ...IconTemplateSizes,
};

export const Colors: Story = {
  ...IconTemplateColors,
};

export const Shrink: Story = {
  ...IconShrink,
};
