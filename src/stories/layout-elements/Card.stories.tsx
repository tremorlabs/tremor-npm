import React from "react";

import { Card } from "components";
import { BaseColors } from "lib";
import { SimpleCard } from "./helpers/SimpleCard";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  title: "UI/Layout/Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: SimpleCard,
};

export const DecorationPosition: Story = {
  render: (args) => (
    <div className="grid gap-4">
      {["left", "top", "right", "bottom", "mistyped"].map((position) => (
        <Card {...args} key={position} decoration={position as any}>
          <p>{`Decoration ${position}`}</p>
        </Card>
      ))}
    </div>
  ),
};

export const DecorationColors: Story = {
  render: (args) => (
    <div className="grid gap-4">
      {Object.values(BaseColors).map((color) => (
        <Card {...args} key={color} decoration="top" decorationColor={color}>
          <p>{`Decoration Color: ${color}`}</p>
        </Card>
      ))}
    </div>
  ),
};
