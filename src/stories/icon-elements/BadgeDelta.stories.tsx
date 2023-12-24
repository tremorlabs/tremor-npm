import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { DeltaTypes as InputDeltaTypes, Sizes as InputSizes } from "lib/constants";

import { BadgeDelta, Grid } from "components";

const meta: Meta<typeof BadgeDelta> = {
  title: "UI/Icon/BadgeDelta",
  component: BadgeDelta,
  args: {
    children: "12.5%",
    tooltip: "Tooltip",
  },
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/icon-elements/BadgeDelta",
  },
};

export default meta;
type Story = StoryObj<typeof BadgeDelta>;

const BadgeDeltaTemplateSizes: Story = {
  render: ({ ...args }) => {
    return (
      <Grid numItems={1} className="gap-y-2">
        {Object.values(InputSizes).map((size) => (
          <>
            <BadgeDelta size={size} deltaType="moderateIncrease" {...args} />
          </>
        ))}
      </Grid>
    );
  },
};

const BadgeDeltaTemplateTypes: Story = {
  render: ({ ...args }) => {
    return (
      <Grid className="gap-y-1">
        <BadgeDelta deltaType="increase" {...args} />
        {Object.values(InputDeltaTypes).map((deltaType) => (
          <BadgeDelta key={deltaType} deltaType={deltaType} {...args} />
        ))}
      </Grid>
    );
  },
};

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  ...BadgeDeltaTemplateSizes,
};

export const Types: Story = {
  ...BadgeDeltaTemplateTypes,
};
