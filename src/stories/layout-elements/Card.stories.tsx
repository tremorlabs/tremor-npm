import React from "react";

import { Card, Grid } from "components";
import { BaseColors, HorizontalPosition, VerticalPosition } from "lib";
import { SimpleCard } from "./helpers/SimpleCard";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  title: "UI/Layout/Card",
  component: Card,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/layout-elements/Card",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: SimpleCard,
};

export const DecorationPosition: Story = {
  render: (args) => (
    <Grid numItems={2} className="gap-x-2 gap-y-2">
      {["left", "top", "right", "bottom", "mistyped"].map((position) => (
        <Card
          {...args}
          key={position}
          decoration={position as HorizontalPosition | VerticalPosition | ""}
        >
          <p>{`Decoration ${position}`}</p>
        </Card>
      ))}
    </Grid>
  ),
};

export const DecorationColors: Story = {
  render: (args) => (
    <Grid numItems={3} className="gap-x-2 gap-y-2">
      {Object.values(BaseColors).map((color) => (
        <Card {...args} key={color} decoration="top" decorationColor={color}>
          <p>{`Decoration Color: ${color}`}</p>
        </Card>
      ))}
    </Grid>
  ),
};
